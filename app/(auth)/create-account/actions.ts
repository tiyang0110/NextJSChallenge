"use server";

import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import { z } from "zod";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

interface joinUserProps {
  success: boolean;
  formErrors: string[];
  fieldErrors: {
      password?: string[];
      confirmPassword?: string[];
      email?: string[];
      username?: string[];
  };
}

const checkIsZodEmail = (email:string) => email.endsWith('@zod.com');
const checkPasswords = ({password, confirmPassword}:{password:string, confirmPassword:string}) => password === confirmPassword;

const formSchema = z.object({
  email: z.string().email().toLowerCase().refine(checkIsZodEmail, '@zod.com 이메일만 사용하실 수 있습니다.'),
  username: z.string().trim().min(5, 'Username은 최소 5자 이상 입력해야 합니다.'),
  password: z.string().min(10).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  confirmPassword: z.string().min(5)
}).superRefine(async ({username}, ctx) => {
  const user = await db.user.findUnique({
    where: { username },
    select: { id: true }
  });

  if(user){
    ctx.addIssue({
      code: 'custom',
      message: '이미 사용중인 Username 입니다.',
      path: ['username'],
      fatal: true
    });

    return z.NEVER;
  }
}).superRefine(async ({email}, ctx) => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true }
  });

  if(user){
    ctx.addIssue({
      code: 'custom',
      message: '이미 사용중인 Email 입니다.',
      path: ['email'],
      fatal: true
    });

    return z.NEVER;
  }
}).refine(checkPasswords, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['confirmPassword']
});

export async function handleForm(_:joinUserProps | null, formData: FormData){
  const data = {
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword')
  }

  const result = await formSchema.spa(data);

  if(!result.success){
    return { ...result.error.flatten(), success: false };
  }else{
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword
      },
      select: { id: true }
    });

    const session = await getSession();

    session.id = user.id;
    await session.save();

    redirect('/profile');
  }
}