// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // 1. Define your base domain (Update this to your actual domain)
  // For local testing, use "localhost:3000"
  // For production, use "abcd-chi-tawny.vercel.app" or your custom domain
  const rootDomain = process.env.NODE_ENV === "production" 
    ? "abcd-chi-tawny.vercel.app" 
    : "localhost:3000";

  // 2. Extract subdomain
  const searchParams = url.searchParams.toString();
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;
  
  const subdomain = hostname.replace(`.${rootDomain}`, "");

  // 3. Special Case: Main Domain
  // If user visits abcd-chi-tawny.vercel.app, show the standard root page
  if (hostname === rootDomain) {
    return NextResponse.next();
  }

  // 4. Multi-tenant Rewrite
  // Rewrites te1.mydomain.com/dashboard -> /te1/dashboard
  return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (static files)
     * 3. /_static (public files)
     * 4. favicon.ico, sitemap.xml, etc.
     */
    "/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};