import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import FormInput from "@/components/form-input";
import { XMarkIcon } from "@heroicons/react/24/outline";

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

export default async function TweetDetail({params}:{ params: { id:string }}){
  const id = Number(params.id);

  if(isNaN(id)) return notFound();

  const tweetDetail = await getTweetDetail(id);

  console.log(tweetDetail);

  if(!tweetDetail) return notFound();

  const isOwner = await chectIsOwner(tweetDetail.userId);

  // const [state, action] = useFormState(addComment, null);


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

  return (
    <div className="bg-slate-100 h-screen p-3 flex flex-col gap-4">
      <div className="flex gap-3 items-end">
        <h1 className="font-bold text-2xl">{tweetDetail.user.username}</h1>
        <h3 className="text-gray-400">{formatToTimeAgo(tweetDetail.created_at)}</h3>
      </div>
      <div className="mb-10">
        <p>{tweetDetail.tweet}</p>
      </div>
      <div className="flex justify-end gap-3 *:font-semibold *:text-md border-b border-slate-300 pb-3">
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
      <form className="flex items-center gap-3 border-b border-slate-300 pb-4">
        <input type="text" name="" placeholder="" className="flex-grow"/>
        <button className="bg-emerald-600 text-white px-5 py-1 rounded-lg">댓글등록</button>
        {/* <FormInput type="text" name="content" placeholder="댓글을 입력하세요." required={true} errors={state?.fieldErrors.content} /> */}
      </form>
      <div className="flex flex-col gap-3 flex-grow overflow-y-auto">
        {tweetDetail.responses.map((response, i) => (
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <span className="font-semibold">{response.user.username}</span>
              <span className="text-sm">{response.content}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{formatToTimeAgo(response.created_at)}</span>
              <XMarkIcon className="size-4 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}