import { InputHTMLAttributes } from "react";

interface FormTextAreaProps {
  name: string;
  errors?: string[];
}

export default function FormTextArea({name, errors=[]}:FormTextAreaProps & InputHTMLAttributes<HTMLInputElement>){
  return(
    <div className={`h-[400px]`}>
      <div className={`${errors.length !== 0 ? 'ring-red-500' : 'ring-neutral-200'} h-full group-focus-within:ring-2 group-focus-within:ring-neutral-500 group-focus-within:outline-none flex flex-col items-center gap-3 bg-transparent rounded-md p-2 w-full ring-1 border-none placeholder:text-neutral-400`}>
        <textarea className="w-full h-full resize-none outline-none" placeholder="트윗 내용을 입력하세요." name={name}></textarea>
      </div>
      {errors.map((error, i) => (
        <span key={i} className="text-red-500 font-medium pl-3">{error}</span>
      ))}
    </div>
  )
}