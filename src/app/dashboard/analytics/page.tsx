'use client';

// If the alias is not configured, use a relative path like:
// import AnalyticsDashboard from '../../../components/dashboard/AnalyticsDashboard';

// export default function SellerAnalyticsPage() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4 text-center">Seller Analytics</h1>
//       <AnalyticsDashboard />
//     </div>
//   );
// }

'use client'; 


import { useEffect, useState } from "react";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";

export default function SellerAnalyticsPage() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setUserId(user.id);
  }, []);

  if (!userId) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Seller Analytics</h1>
      <AnalyticsDashboard userId={userId} proxy={true} />
    </div>
  );
}
