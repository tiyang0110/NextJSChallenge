import { formatToTimeAgo } from "@/lib/utils";
import { responseType } from "./add-response-form";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { deleteResponse } from "@/app/detail/[id]/action";

export default function Response({ content, id, created_at, user: { username }, tweetId  }:responseType & { tweetId: number } ){
  return (
    <div key={id} className="flex justify-between">
      <div className="flex gap-3 items-center">
        <span className="font-semibold">{username}</span>
        <span className="text-sm">{content}</span>
      </div>
      <div className="flex items-center gap-2">
        <span>{formatToTimeAgo(created_at)}</span>
        <XMarkIcon onClick={() => deleteResponse(id, tweetId)}  className="size-4 cursor-pointer" />
      </div>
    </div>
  )
}