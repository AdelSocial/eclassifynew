'use client';
import { useEffect, useState } from 'react';
// If the alias is not configured, use a relative path like:
import AnalyticsDashboard from '../../../components/dashboard/AnalyticsDashboard';

export default function SellerAnalyticsPage() {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const userJson = localStorage.getItem("user");

    if (userJson) {
      const user = JSON.parse(userJson);
      setUserId(user.id);
    }
  }, []);

  if (!userId) return <p>Loading user...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Seller Analytics</h1>

      <AnalyticsDashboard user_id={userId} />
    </div>
  );
}
