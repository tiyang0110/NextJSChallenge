"use client";

import { useFormStatus } from "react-dom";

interface FormBtnProps{
  text: string;
}

export default function FormBtn({ text }:FormBtnProps){
  const { pending } = useFormStatus();

  return (
    <button 
      className="mt-10 w-full rounded-full bg-slate-300 hover:bg-slate-400 hover:text-white py-3 text-black font-semibold"
      disabled={pending}
    >{pending ? '로딩중...' : text}</button>
  )
}