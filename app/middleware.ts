// app/middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";

  const tenant =
    host.includes("vercel.app") || host.includes("localhost")
      ? "default"
      : host.split(".")[0];

  const res = NextResponse.next();

  // Set cookie for tenant, accessible in pages
  res.cookies.set("tenant", tenant, {
    path: "/",
  });

  return res;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
