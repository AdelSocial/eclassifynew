// import { NextResponse } from 'next/server';

// export async function GET() {
//   // Replace this with the *actual* PHP endpoint you found in step 1
//   const BACKEND_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/your-real-views-endpoint`;
  
//   const res = await fetch(BACKEND_URL, {
//     // include credentials if needed
//     // credentials: 'include', 
//   });
//   if (!res.ok) {
//     return NextResponse.json({ error: 'Backend error', status: res.status }, { status: 502 });
//   }
//   const data = await res.json();
//   return NextResponse.json(data);
// }

// app/api/proxy-analytics/route.ts  (or wherever you had it)
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId') || '0';
  const endpoint = url.searchParams.get('endpoint') || 'views'; // 'views' or 'leads'

  // Real backend endpoint: 
  // const BACKEND_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/analytics/seller/${encodeURIComponent(userId)}/${endpoint}`;
  const BACKEND_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/analytics/seller/${encodeURIComponent(userId)}/${endpoint}`;

  const res = await fetch(BACKEND_URL, {
    // Include credentials if needed and if your backend accepts them:
    // credentials: 'include',
    // headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Backend error', status: res.status }, { status: 502 });
  }
  const data = await res.json();
  return NextResponse.json(data);
}

