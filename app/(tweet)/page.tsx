import AddTweet from "@/components/add-tweet";
import Tweet from "@/components/tweet";
import db from "@/lib/db";

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

export default async function MainList(){
  const getTweets = await getTweetList();

  return (
    <div className="flex flex-col py-2 overflow-y-auto">
      {getTweets.map((tweet, i) => <Tweet key={tweet.id} {...tweet} />)}
      <AddTweet />
    </div>
  )
}