import Cookies from "js-cookie";
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = Cookies.get("token");
  console.log("tokenfrom middleware------------------", token);
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/AdminDashboard", "/admin/:path*"],
};
