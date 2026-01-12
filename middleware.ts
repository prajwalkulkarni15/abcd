import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";

  // Preview deployments / localhost fallback
  if (host.includes("vercel.app") || host.includes("localhost")) {
    const headers = new Headers(req.headers);
    headers.set("x-tenant", "default");
    return NextResponse.next({ request: { headers } });
  }

  // Extract subdomain (tenant1.mydomain.com -> tenant1)
  const subdomain = host.split(".")[0];

  const headers = new Headers(req.headers);
  headers.set("x-tenant", subdomain);

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"], // apply middleware to all frontend routes
};
