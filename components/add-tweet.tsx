import Link from "next/link";

export default function AddTweet(){
  return (
    <Link href='/add'>
      <button className="fixed right-3 bottom-3 size-10 bg-emerald-400 text-white text-lg rounded-full">+</button>
    </Link>
  )
}