"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import z from "zod"

const formSchema = z.object({
  content: z.string().min(2, '댓글은 최소 두글자 이상 입력해 주세요.')
});

export async function addResponse(prevState:any, formData: FormData){
  const data = {
    content: formData.get('content')
  }

  const result = await formSchema.spa(data);

  if(!result.success){
    return { ...result.error?.flatten(), succes: false };
  }else{
    const session = getSession();

    // 댓글 저장하고
    // 태그처리
  }
}

