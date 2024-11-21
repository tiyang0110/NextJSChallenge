"use client";

import { dislikeTweet, likeTweet } from "@/app/detail/[id]/action";
import { HandThumbUpIcon as HandThumbUpIconOutline } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/24/solid";
import { useOptimistic } from "react";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({isLiked, likeCount, tweetId}:LikeButtonProps){
  const [state, reducerFn] = useOptimistic({ isLiked, likeCount }, (previousState, payload) => ({
    isLiked: !previousState.isLiked,
    likeCount: previousState.isLiked ? previousState.likeCount - 1 : previousState.likeCount + 1
  }));

  const onClick = async () => {
    reducerFn(undefined);

    if(isLiked){
      await dislikeTweet(tweetId);
    }else {
      await likeTweet(tweetId);
    }
  }

  return (
    <button onClick={onClick} className={`flex items-center gap-2 text-neutral-400 text-sm border rounded-full py-2 px-3 ${state.isLiked ? "bg-emerald-400 text-white border-emerald-500" : "hover:bg-emerald-100"}`}>
      {state.isLiked ? (
        <>
          <HandThumbUpIconSolid className="size-5" />
          <span>{state.likeCount}</span>
        </>
      ) : (
        <>
          <HandThumbUpIconOutline className="size-5" />
          <span>좋아요 {state.likeCount}</span>
        </>
      )}
    </button>
  )
}