import { cookies } from "next/headers";

export default function TenantHome() {
  // Read tenant cookie
  // const tenant = cookies().get("tenant")?.value || "default";

  return (
    <div>
      <h1>Tenant: {"abcd"}</h1>
      <p>This is a shared deployment.</p>
    </div>
  );
}