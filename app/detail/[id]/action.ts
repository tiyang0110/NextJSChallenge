"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";
import z from "zod"

const formSchema = z.object({
  content: z.string().min(2, '댓글은 최소 두글자 이상 입력해 주세요.')
});

export async function addResponse(content:string, tweetId:number){
  const session = await getSession();

  const result = await formSchema.spa({ content });

  if(!result.success){
    return { ...result.error.flatten(), success: false };
  }else{
    await db.response.create({
      data: {
        content,
        userId: session.id!,
        tweetId
      }
    });

    revalidatePath(`/detail/${tweetId}`);

    return { success: true, formErrors: [], fieldErrors: { content: [] } };
  }
}

export async function deleteResponse(responseId:number, tweetId:number){
  await db.response.delete({
    where: { id: responseId }
  });

  revalidatePath(`/detail/${tweetId}`);
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