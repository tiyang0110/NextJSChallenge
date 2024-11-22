import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import AddReponseForm from "@/components/add-response-form";
import LikeButton from "@/components/like-button";
import { unstable_cache as nextCache } from "next/cache";

async function chectIsOwner(userId:number){
  const session = await getSession();

  if(session.id){
    return session.id === userId;
  }

  return false;
}

async function getTweetDetail(id:number){
  const tweetDetail = db.tweet.findUnique({
    where: { id },
    include: {
      user: {
        select: { username: true }
      },
      responses: {
        select: {
          id: true,
          content: true,
          created_at: true,
          user: {
            select: {
              username: true
            }
          }
        }
      }
    }
  });

  return tweetDetail;
}

const getCachedTweetDetail = async (tweetId:number) => {
  const cachedOperation = nextCache(getTweetDetail, ['tweet-detail'], { tags: [`tweet-detail-${tweetId}`]});

  return cachedOperation(tweetId);
}

async function getLikeStatus(tweetId:number, userId:number){
  const isLiked = await db.like.findUnique({
    where: { id: { tweetId, userId }}
  });

  const likeCount = await db.like.count({
    where: { tweetId }
  });

  return { isLiked: Boolean(isLiked), likeCount }
}

const getCachedLikeStatus = (tweetId:number, userId:number) => {
  const cachedOperation = nextCache(getLikeStatus, ['like-status'], { tags: [`like-status-${tweetId}`] });

  return cachedOperation(tweetId, userId);
}

export default async function TweetDetail({params}:{ params: { id:string }}){
  const id = Number(params.id);

  if(isNaN(id)) return notFound();

  const tweetDetail = await getCachedTweetDetail(id);

  if(!tweetDetail) return notFound();

  const isOwner = await chectIsOwner(tweetDetail.userId);

  const deleteTweet = async () => {
    "use server";

    await db.tweet.delete({
      where: { id: tweetDetail.id }
    });

    redirect('/');
  }

  const changeTweetDetail = async () => {
    "use server";

    const newTweets = await db.tweet.findMany({
      where: {
        NOT: {
          id: tweetDetail.id
        }
      },
      select: { id: true }
    });

    const targetTweet = Math.floor(Math.random() * (newTweets.length - 0) + 0);

    if(newTweets.length === 0) redirect('/');

    redirect(`/detail/${newTweets[targetTweet].id}`);
  }

  const { likeCount, isLiked } = await getCachedLikeStatus(id, tweetDetail.userId);

  return (
    <div className="bg-slate-100 h-screen p-3 flex flex-col gap-4">
      <div className="flex gap-3 items-end">
        <h1 className="font-bold text-2xl">{tweetDetail.user.username}</h1>
        <h3 className="text-gray-400">{formatToTimeAgo(tweetDetail.created_at)}</h3>
      </div>
      <div className="mb-10">
        <p>{tweetDetail.tweet}</p>
      </div>
      <div className="flex justify-between gap-3 *:font-semibold *:text-md border-b border-slate-300 pb-3">
        <div>
          <LikeButton likeCount={likeCount} isLiked={isLiked} tweetId={id} />
        </div>
        <div className="flex gap-3 items-center">
          <Link className="bg-gray-600 text-white px-5 py-1 rounded-lg" href='/'>목록</Link>
          <form action={changeTweetDetail}>
            <button className="bg-emerald-600 text-white px-5 py-1 rounded-lg">다른 글 보기</button>
          </form>
          {isOwner && (
            <form action={deleteTweet}>
              <button className="bg-orange-700 text-white px-5 py-1 rounded-lg">삭제</button>
            </form>
          )}
        </div>
      </div>
      <AddReponseForm responseList={tweetDetail.responses} tweetId={id} />
    </div>
  )
}