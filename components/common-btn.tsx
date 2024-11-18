import { useFormStatus } from "react-dom";

interface CommonBtnProps{
  text: string;
  bgColor: string;
}

export default function CommonBtn({text, bgColor}:CommonBtnProps){
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={`w-full py-3 flex items-center justify-center text-white rounded-full${' ' + bgColor}`}>{pending? '처리중..' : text}</button>
  )
}