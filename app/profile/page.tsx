import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser(){
  const { id } = await getSession();

  if(id){
    const user = await db.user.findUnique({ where: { id } });

    if(user) return user;
  }

  notFound();
}


export default async function Profile(){
  const user = await getUser();
  const logout = async () => {
    "use server";

    const session = await getSession();
    session.destroy();

    redirect('/');
  }

  console.log(user);


  return (
    <div>
      <h1>{`반갑습니다 ${user.username}`}</h1>
      <div>
        {/* <span>{`당신의 트윗 수는 : ${user.tweets}`}</span> */}
        <span></span>
      </div>
      <form action={logout}>
        <button>Log out</button>
      </form>
    </div>
  )
}