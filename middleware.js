import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {    
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    const token = await getToken({ req, secret: "some_secret_value" });
    const { pathname } = req.nextUrl;

    if (pathname.includes("/api/auth") || token) {
        return NextResponse.next();
    }

    if (!token && pathname !== url.pathname) {
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: "/",
}
