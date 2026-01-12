import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // Set this to your Vercel assigned domain
  const rootDomain = "abcd-chi-tawny.vercel.app";

  // 1. Skip middleware for internal Vercel requests or static files
  if (
    url.pathname.startsWith("/_next") || 
    url.pathname.includes(".") || // Skip files like favicon.ico
    hostname === "localhost:3000" || // Handle local root
    hostname === rootDomain // Handle production root
  ) {
    return NextResponse.next();
  }

  // 2. Extract the subdomain (tenant)
  // e.g., te1.abcd-chi-tawny.vercel.app -> te1
  const tenant = hostname.replace(`.${rootDomain}`, "");

  // 3. Perform the Internal Rewrite
  // This tells Next.js to look inside app/(tenant)/[tenant]/...
  return NextResponse.rewrite(new URL(`/${tenant}${url.pathname}`, req.url));
}

export const config = {
  // This matcher ensures the middleware doesn't run on every single image/asset
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};