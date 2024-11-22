import { EnvelopeIcon, UserIcon, KeyIcon } from "@heroicons/react/24/solid";
import { InputHTMLAttributes } from "react";

interface FormInputProps{
  name: string;
  errors?: string[];
  icon?: string;
}

export default function FormInput({name, errors=[], icon, ...rest}:FormInputProps & InputHTMLAttributes<HTMLInputElement>){
  return (
    <div className="group w-full">
      <div className={`${errors.length !== 0 ? 'ring-red-500' : 'ring-neutral-200'} group-focus-within:ring-2 group-focus-within:ring-neutral-500 group-focus-within:outline-none flex items-center gap-3 bg-transparent rounded-full px-4 w-full h-10 ring-1 border-none placeholder:text-neutral-400`}>
        {icon === 'email' ? (
          <EnvelopeIcon className="size-6" />
        ) : icon === 'person' ? (
          <UserIcon className="size-6" />
        ) : icon === 'password' ? (
          <KeyIcon className="size-6" />
        ) : (
          null
        )}
        <input className="w-full outline-none bg-transparent" name={name} {...rest} />
      </div>
      {errors.map((error, i) => (
        <span key={i} className="text-red-500 font-medium pl-3">{error}</span>
      ))}
    </div>
  )
}