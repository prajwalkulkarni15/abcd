import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  const rootDomain = "abcd-delta-ruddy.vercel.app";

  // Skip internal/static requests
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.includes(".") ||
    hostname === "localhost:3000" ||
    hostname === rootDomain
  ) {
    return NextResponse.next();
  }

  // Extract subdomain
  const tenant = hostname.replace(`.${rootDomain}`, "");

  // Rewrite internally
  return NextResponse.rewrite(
    new URL(`/${tenant}${url.pathname}`, req.url)
  );
}
