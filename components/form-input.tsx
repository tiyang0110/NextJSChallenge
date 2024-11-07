import { EnvelopeIcon, UserIcon, KeyIcon } from "@heroicons/react/24/solid";

interface FormInputProps{
  type: string;
  name: string;
  placeholder: string;
  required: boolean;
  errors?: string[];
  icon: string;
}

export default function FormInput({type, name, placeholder, required, errors=[], icon}:FormInputProps){


  return (
    <div className="group">
      <div className={`${errors.length !== 0 ? 'ring-red-500' : 'ring-neutral-200'} group-focus-within:ring-2 group-focus-within:ring-neutral-500 group-focus-within:outline-none flex items-center gap-3 bg-transparent rounded-full px-4 w-full h-10 ring-1 border-none placeholder:text-neutral-400`}>
        {icon === 'email' ? (
          <EnvelopeIcon className="size-6" />
        ) : icon === 'person' ? (
          <UserIcon className="size-6" />
        ) : (
          <KeyIcon className="size-6" />
        )}
        <input className="w-full outline-none" type={type} name={name} placeholder={placeholder} required={required} />
      </div>
      <span className="text-red-500 font-medium pl-3">{errors}</span>
    </div>
  )
}