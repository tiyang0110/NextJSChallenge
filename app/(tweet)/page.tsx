import Tweet from "@/components/tweet";
import db from "@/lib/db";
import Link from "next/link";

async function getTweetList(){
  const tweets = db.tweet.findMany({
    include: {
      user: {
        select: { username: true }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  });

  return tweets;
}

export default async function MainList(){
  const getTweets = await getTweetList();

  return (
    <div className="flex flex-col py-2 overflow-y-auto">
      {getTweets.map((tweet, i) => <Tweet key={tweet.id} {...tweet} />)}
      <Link href='/add'>
        <button className="fixed right-3 bottom-3 size-10 bg-emerald-400 text-white text-lg rounded-full">+</button>
      </Link>
    </div>
  )
}