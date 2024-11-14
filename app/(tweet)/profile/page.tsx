import db from "@/lib/db";
import getSession from "@/lib/session";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

async function getUserData(){
  const { id } = await getSession();

  if(id){
    const user = await db.user.findUnique({ where: { id } });
    const tweets = await db.tweet.findMany({ where: { userId: id } });
    const likes = await db.like.findMany({ where: { userId: id }});

    if(user) return { userInfo: user, tweets, likes };
  }

  notFound();
}

export default async function Profile(){
  const { userInfo, tweets, likes } = await getUserData();
  const logout = async () => {
    "use server";

    const session = await getSession();
    session.destroy();

    redirect('/');
  }

  return (
    <div className="p-3">
      <h1>{`반갑습니다 ${userInfo.username}`}</h1>
      <div className="flex gap-3">
        <span>{`당신의 트윗 수는 : ${tweets.length}`}</span>
        <span>{`당신의 좋아요 수는 : ${likes.length}`}</span>
      </div>
      <form action={logout}>
        <button>Log out</button>
      </form>
      <Link href='/'>
        <button>트윗 목록으로</button>
      </Link>
    </div>
  )
}