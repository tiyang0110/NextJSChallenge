"use server";

import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR, zodResultProps } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkIsZodEmail = (email:string) => {
  return email.endsWith('@zod.com');
}

const formSchema = z.object({
  email: z.string().email().toLowerCase().refine(checkIsZodEmail, '@zod.com 이메일만 사용하실 수 있습니다.'),
  password: z.string().min(10).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

// region 세션 저장
export const SetSession = async (id:number) => {
  try{
    const session = await getSession();
    session.id = id;
    await session.save();
  }catch(e){
    console.log(e);
    return false;
  }

  return true;
}

export async function login(_:zodResultProps | null, formData: FormData){
  const data = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  const result = await formSchema.spa(data);

  if(!result.success){
    return { ...result.error.flatten(), success: false };
  }else{
    const user = await db.user.findUnique({
      where: { email: result.data.email },
      select: {
        id: true,
        password: true
      }
    });

    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");

    if(ok){
      await SetSession(user!.id);
      redirect('/');
    }else{
      return { ...result,
        formErrors: [],
        fieldErrors: {
          email: [],
          password: ['잘못된 비밀번호 입니다.']
        }
      };
    }
  }
}