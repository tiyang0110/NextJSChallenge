"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabMenuBtnProps {
  href: string;
  menuName: string;
}

export default function TabMenuBtn({href, menuName}:TabMenuBtnProps){
  const isSelected = usePathname() === href;

  return (
    <Link className={`hover:font-extrabold hover:text-emerald-600 transition-all border-b-2 border-b-transparent hover:border-b-emerald-600${isSelected && ' text-emerald-600 border-b-emerald-600'}`} href={href}>{menuName}</Link>
  )
}