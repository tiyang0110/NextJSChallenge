"use client";

import FormInput from "./form-input"
import { useOptimistic, useState } from "react";
import { addResponse } from "@/app/detail/[id]/action";
import Response from "./response";

export interface responseType {
  content: string;
  id: number;
  created_at: Date;
  user: {
      username: string;
  };
}

export default function AddReponseForm({ responseList, tweetId } : { responseList: responseType[], tweetId: number }){
  const [errors, setErrors] = useState<string[] | undefined>([]);
  const [responses, optimisticResponse] = useOptimistic(
    responseList,
    (state, newResponse:responseType) => responseList = [...state, newResponse]
  );

  const addResponseAction = async (formData: FormData) => {
    const content = String(formData.get('content'));

    optimisticResponse({
      content: '등록중..',
      id: 0,
      created_at: new Date(),
      user: {
        username: ''
      }
    });

    const result = await addResponse(content, tweetId);

    if(!result.success){
      setErrors(result?.fieldErrors.content);
    }else{
      setErrors([]);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-3 flex-grow overflow-y-auto">
        {responses.map((response) => <Response key={response.id} tweetId={tweetId} {...response} /> )}
      </div>
      <form action={addResponseAction} className="flex flex-col gap-2">
        <span className="text-red-600">{errors}</span>
        <div className="flex items-center justify-between gap-3">
          <FormInput name="content" />
          <button className="bg-emerald-600 text-white px-5 py-1 rounded-lg w-32 h-full">댓글등록</button>
        </div>
      </form>
    </>
  )
}