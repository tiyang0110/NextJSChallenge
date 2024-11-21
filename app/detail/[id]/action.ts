"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod"

const formSchema = z.object({
  content: z.string().min(2, '댓글은 최소 두글자 이상 입력해 주세요.')
});

export async function addResponse(prevState:any, formData: FormData){
  const data = {
    content: formData.get('content')
  }

  console.log('inin');
  console.log(formData);

  const result = await formSchema.spa(data);

  if(!result.success){
    return { ...result.error?.flatten(), succes: false };
  }else{
    const session = await getSession();
      // 댓글 저장하고
      // 태그처리
  }
}


export const likeTweet = async (tweetId:number) => {
  const session = await getSession();

  try{
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!
      }
    });

    revalidateTag(`like-status-${tweetId}`);
  }catch(e){}
}

export const dislikeTweet = async (tweetId:number) => {
  const session = await getSession();
  
  try{  
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!
        }
      }
    });

    revalidateTag(`like-status-${tweetId}`);
  }catch(e){}    
}