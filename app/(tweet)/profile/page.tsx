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
      <div className="flex items-center justify-between  mb-5">
        <h1 className="text-2xl font-bold">{`반갑습니다 ${userInfo.username}`}</h1>
        <form action={logout}>
          <button className="bg-emerald-400 px-3 py-1 rounded-full text-white">Log out</button>
        </form>
      </div>
      <div className="flex gap-3">
        <span>{`당신이 작성한 수는 : ${tweets.length}`}</span>
        <span>{`당신이 받은 좋아요 수는 : ${likes.length}`}</span>
      </div>
    </div>
  )
}