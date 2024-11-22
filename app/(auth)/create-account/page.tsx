"use client";

import Input from "@/components/form-input";
import FormBtn from "@/components/form-btn";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";

export default function Home() {
  const [state, action] = useFormState(handleForm, null);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="w-[600px] h-[600px] bg-white shadow-lg border border-slate-400 rounded-2xl flex flex-col p-10">
        <h1 className="text-center font-semibold text-2xl mb-12">&quot;Welcome Join Challenger&quot;</h1>
        <form action={action} className="flex flex-col mb-4 gap-3">
          <Input type="email" name="email" placeholder="Email" required={true} errors={state?.fieldErrors.email} icon="email" />
          <Input type="text" name="username" placeholder="Username" required={true} errors={state?.fieldErrors.username} icon='person' />
          <Input type="password" name="password" placeholder="Password" required={true} errors={state?.fieldErrors.password} icon='password' />
          <Input type="password" name="confirmPassword" placeholder="Confirm Password" required={true} errors={state?.fieldErrors.confirmPassword} icon='password' />
          <FormBtn text="Log in" />
        </form>
      </div>
    </div>
  );
}