"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import z from "zod"

const formSchema = z.object({
  tweet: z.string().trim().min(10, '최소 10글자 이상 입력해 주세요.')
});

export async function addTweet(prevState:any, formData: FormData){
  const data = {
    tweet: formData.get('tweet')
  }

  const result = formSchema.safeParse(data);

  if(!result.success){
    return { ... result.error.flatten(), success: false };
  }else{
    const session = await getSession();

    if(session.id){
      const tweet = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          user: {
            connect: {
              id: session.id
            }
          }
        },
        select: { id: true }
      });
  
      redirect(`/detail/${tweet.id}`);
    }
  }
}