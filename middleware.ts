import { NextRequest, NextResponse } from "./node_modules/next/server";


interface Routes {
  [key:string]: boolean;
}

const publicOnlyUrls: Routes = {
  '/': true,
  '/login': true,
  '/create-account': true,
}

export async function middleware(request: NextRequest){
  // const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];

  // if(!session.id){
  //   if(!exists){
  //     return NextResponse.redirect(new URL('/', request.url));
  //   }
  // }else{
  //   if(exists){
  //     return NextResponse.redirect(new URL('/profile', request.url));
  //   }
  // }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
}