"use client";

import Input from "@/components/form-input";
import FormBtn from "@/components/form-btn";
import { useFormState } from "react-dom";
import Link from "next/link";
import { login } from "./actions";

export default function Home() {
  const [state, action] = useFormState(login, null);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="w-[600px] h-[600px] bg-white shadow-lg border border-slate-400 rounded-2xl flex flex-col p-10">
        <h1 className="text-center font-semibold text-2xl mb-12">&quot;Hello Challenger&quot;</h1>
        <form action={action} className="flex flex-col mb-4 gap-3">
          <Input type="email" name="email" placeholder="Email" required={true} errors={state?.fieldErrors.email} icon="email" />
          <Input type="password" name="password" placeholder="Password" required={true} errors={state?.fieldErrors.password} icon='password' />
          <FormBtn text="Log in" />
        </form>
        
        <Link href='/create-account'>
          <div className="text-center">회원가입하기</div>
        </Link>

      </div>
    </div>
  );
}
