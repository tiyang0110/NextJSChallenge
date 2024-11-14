import getSession from "./lib/session";
import { NextRequest, NextResponse } from "./node_modules/next/server";


interface Routes {
  [key:string]: boolean;
}

const publicOnlyUrls: Routes = {
  '/login': true,
  '/create-account': true,
  '/detail/*': true
}

export async function middleware(request: NextRequest){
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];

  if(!session.id){
    if(!exists){
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }else{
    if(exists){
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
}