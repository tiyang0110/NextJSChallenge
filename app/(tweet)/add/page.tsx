"use client";

import CommonBtn from "@/components/common-btn";
import { useFormState } from "react-dom";
import { addTweet } from "./action";
import Link from "next/link";
import FormTextArea from "@/components/form-textarea";

export default function AddTweetForm(){
  const [state, action] = useFormState(addTweet, null);

  return (
    <div className="flex-grow py-3 justify-between">
      <form className="h-full flex flex-col justify-between px-3" action={action}>
        <FormTextArea name="tweet" placeholder="내용을 입력하세요." errors={state?.fieldErrors.tweet} />
        <div className="flex items-center justify-between gap-5 px-5 mt-10 *:w-full">
          <CommonBtn text="등록" bgColor="bg-emerald-400" />
          <Link href='/'>
            <CommonBtn text="취소" bgColor="bg-gray-400" />
          </Link>
        </div>
      </form>
    </div>
  )
}