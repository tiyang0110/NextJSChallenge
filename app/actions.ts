"use server";

import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import { z } from "zod";

const checkIsZodEmail = (email:string) => {
  return email.endsWith('@zod.com');
}

const formSchema = z.object({
  email: z.string().email().toLowerCase().refine(checkIsZodEmail, '@zod.com 이메일만 사용하실 수 있습니다.'),
  username: z.string().trim().min(5, 'Username은 최소 5자 이상 입력해야 합니다.'),
  password: z.string().min(10).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function handleForm(prevState:any, formData: FormData){
  const data = {
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password')
  }

  const result = await formSchema.spa(data);

  if(!result.success){
    return { ...result.error.flatten(), success: false };
  }else{
    return { ...result, 
      fieldErrors: {
        email: [],
        username: [],
        password: []
      }
    };
  }
}