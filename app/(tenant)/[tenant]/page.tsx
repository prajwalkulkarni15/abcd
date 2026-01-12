// app/(tenant)/[tenant]/page.tsx

interface TenantProps {
  params: {
    tenant: string;
  };
}

export default function TenantPage({ params }: TenantProps) {
  const { tenant } = params;

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '40px' }}>
      <header style={{ borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
        <h1>{tenant.toUpperCase()} Portal</h1>
      </header>

      <main>
        <p>Welcome back! You are currently viewing the dedicated space for <strong>{tenant}</strong>.</p>

        <div style={{ marginTop: '20px', padding: '20px', background: '#f4f4f4', borderRadius: '8px' }}>
          <h3>Tenant-Specific Data</h3>
          <p>The subdomain detected is: <code>{tenant}.abcd-chi-tawny.vercel.app</code></p>
        </div>
      </main>
    </div>
  );
}

// export default function TenantPage() {
//   return <div>Tenant Page</div>;
// }
