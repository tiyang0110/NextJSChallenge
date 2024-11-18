"use server";

import { getIronSession } from "@/node_modules/iron-session/dist/index.cjs";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

export default async function getSession(){
  return getIronSession<SessionContent>(cookies(), {
    cookieName: 'login-token',
    password: process.env.COOKIE_PASSWORD!
  });
}
