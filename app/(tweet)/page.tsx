import AddTweet from "@/components/add-tweet";
import Tweet from "@/components/tweet";
import db from "@/lib/db";
import { unstable_cache as nextCache } from "next/cache";

async function getTweetList(){
  const tweets = db.tweet.findMany({
    include: {
      user: {
        select: { username: true }
      },
      _count: {
        select: {
          likes: true,
          responses: true
        }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  });

  return tweets;
}

const getCachedTweetList = async () => {
  const cachedOperation = nextCache(getTweetList, ['tweet-list'], { 
    tags: ['tweet-list'],
    revalidate: 30
  });

  return cachedOperation();
}

export default async function MainList(){
  const getTweets = await getCachedTweetList();

  return (
    <div className="flex flex-col py-2 overflow-y-auto">
      {getTweets.map((tweet) => <Tweet key={tweet.id} {...tweet} />)}
      <AddTweet />
    </div>
  )
}