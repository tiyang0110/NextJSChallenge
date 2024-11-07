"use client";

import Input from "@/components/form-input";
import FormBtn from "@/components/form-btn";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const [state, action] = useFormState(handleForm, null);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="w-[600px] h-[600px] bg-white shadow-lg border border-slate-400 rounded-2xl flex flex-col p-10">
        <h1 className="text-center font-semibold text-2xl mb-12">"Hello Challenger"</h1>
        <form action={action} className="flex flex-col mb-4">
          <Input type="email" name="email" placeholder="Email" required={true} errors={[]} icon="email" />
          <Input type="text" name="username" placeholder="Username" required={true} errors={[]} icon='person' />
          <Input type="password" name="password" placeholder="Password" required={true} errors={state?.errors} icon='password' />
          <FormBtn text="Log in" />
        </form>
        {state?.success ? (
          <div className="flex item p-4 bg-green-300 rounded-lg gap-4">
          <CheckCircleIcon className="size-6" />
          <span>로그인 성공!</span>
        </div>
        ) : null}
      </div>
    </div>
  );
}
