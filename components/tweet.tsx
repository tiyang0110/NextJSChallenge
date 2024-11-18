import { formatToTimeAgo } from "@/lib/utils";
import { HeartIcon } from "@heroicons/react/24/outline";

import Link from "next/link";

interface TweetProps {
  id: number;
  tweet: string;
  created_at: Date;
  user: { username: string }
}

export default function Tweet({id, tweet, created_at, user:{ username }}:TweetProps){
  return (
    <div className="flex flex-col gap-3 p-3 border-b max-h-[200px]">
      <Link href={`/detail/${id}`}>
        <div className="flex gap-3">
          <div className="font-bold">{username}</div>
          <div className="text-stone-500">{formatToTimeAgo(created_at)}</div>
        </div>
        <p className="text-sm text-gray-800 text-ellipsis break-words line-clamp-2">{tweet}</p>
      </Link>
      <div className="flex justify-end">
        <HeartIcon className="size-5"/>
      </div>
    </div>
  ) 
}