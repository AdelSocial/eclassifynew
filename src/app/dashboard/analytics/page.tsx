'use client';

import { useEffect, useState } from 'react';
import AnalyticsDashboard from '../../../components/dashboard/AnalyticsDashboard';

export default function SellerAnalyticsPage() {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    console.log("CHECKING LOCALSTORAGE...");
    console.log(localStorage);

    const data = localStorage.getItem("user");

    if (!data) {
      console.warn("NO 'user' FOUND IN LOCALSTORAGE");
      return;
    }

    const user = JSON.parse(data);
    console.log("USER LOADED:", user);

    setUserId(user.id);
  }, []);

  if (!userId) return <p>Loading user...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Seller Analytics</h1>
      <AnalyticsDashboard user_id={userId} />
    </div>
  );
}
