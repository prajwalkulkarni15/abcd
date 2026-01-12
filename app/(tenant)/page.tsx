import { headers } from "next/headers";

export default function TenantHome() {
  // headers() returns ReadonlyHeaders in server components
  const tenant = headers().get("x-tenant") || "default";

  return (
    <div>
      <h1>Tenant: {tenant}</h1>
      <p>This is a shared deployment.</p>
    </div>
  );
}
