// 'use client';

// import { useState, useEffect } from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
// } from 'recharts';

// interface ViewStat { listing: string; views: number }
// interface LeadStat { listing: string; leads: number }

// export default function AnalyticsDashboard() {
//   const [views, setViews] = useState<ViewStat[]>([]);
//   const [leads, setLeads] = useState<LeadStat[]>([]);
//   const apiBase = process.env.NEXT_PUBLIC_API_URL;

//   useEffect(() => {
//     async function fetchStats() {
//       try {
//         // 1) views per listing
//        const resViews = await fetch('/api/analytics/views-per-listing');

//         setViews(await resViews.json());

//         // 2) leads/chats/bookings per listing
//       const resLeads = await fetch('/api/analytics/leads-per-listing');
//         setLeads(await resLeads.json());

//       } catch (err) {
//         console.error('Failed to load analytics', err);
//       }
//     }
//     fetchStats();
//   }, [apiBase]);

//   return (
//     <div className="space-y-8">
//       {/* Views Chart */}
//       <div>
//         <h2 className="text-xl font-semibold mb-2">Views per Listing</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={views}>
//             <XAxis dataKey="listing" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="views" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Leads Chart */}
//       <div>
//         <h2 className="text-xl font-semibold mb-2">Leads / Chats / Bookings per Listing</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={leads}>
//             <XAxis dataKey="listing" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="leads" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell, Legend
// } from 'recharts';
// import { Card, Row, Col, Typography, Divider } from 'antd';

// const { Title } = Typography;

// interface ViewStat { listing: string; views: number }
// interface LeadStat { listing: string; leads: number }

// const fakeViews: ViewStat[] = [
//   { listing: 'Listing A', views: 120 },
//   { listing: 'Listing B', views: 80 },
//   { listing: 'Listing C', views: 150 },
// ];

// const fakeLeads: LeadStat[] = [
//   { listing: 'Listing A', leads: 10 },
//   { listing: 'Listing B', leads: 5 },
//   { listing: 'Listing C', leads: 20 },
// ];

// const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

// export default function AnalyticsDashboard() {
//   const views = fakeViews;
//   const leads = fakeLeads;

//   return (
//     <div className="space-y-12">
//       {/* Views Charts */}
//       <Card
//         title={<Title level={4} style={{ margin: 0 }}>Views per Listing</Title>}
//         bordered={false}
//         style={{ marginBottom: 32, boxShadow: '0 2px 8px #f0f1f2' }}
//       >
//         <Row gutter={[32, 32]}>
//           <Col xs={24} md={12}>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={views}>
//                 <XAxis dataKey="listing" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="views" fill="#8884d8" />
//               </BarChart>
//             </ResponsiveContainer>
//           </Col>
//           <Col xs={24} md={12}>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={views}
//                   dataKey="views"
//                   nameKey="listing"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   label
//                 >
//                   {views.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Legend />
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </Col>
//         </Row>
//       </Card>

//       {/* Leads Charts */}
//       <Card
//         title={<Title level={4} style={{ margin: 0 }}>Leads / Chats / Bookings per Listing</Title>}
//         bordered={false}
//         style={{ boxShadow: '0 2px 8px #f0f1f2' }}
//       >
//         <Row gutter={[32, 32]}>
//           <Col xs={24} md={12}>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={leads}>
//                 <XAxis dataKey="listing" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="leads" fill="#82ca9d" />
//               </BarChart>
//             </ResponsiveContainer>
//           </Col>
//           <Col xs={24} md={12}>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={leads}
//                   dataKey="leads"
//                   nameKey="listing"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   label
//                 >
//                   {leads.map((entry, index) => (
//                     <Cell key={`cell-lead-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Legend />
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </Col>
//         </Row>
//       </Card>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Card, Row, Col, Typography, Divider, Spin } from 'antd';

const { Title } = Typography;
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1'];

interface ViewStat { listing: string; views: number }
interface LeadStat { listing: string; leads: number }

type Props = {
  userId?: number | string; // pass seller id
  // If you want to use the proxied route, set proxy=true
  proxy?: boolean;
};

export default function AnalyticsDashboard({ userId = '0', proxy = false }: Props) {
  const [views, setViews] = useState<ViewStat[]>([]);
  const [leads, setLeads] = useState<LeadStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const base = proxy
          ? `/api/proxy-analytics?userId=${encodeURIComponent(String(userId))}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/analytics/seller/${encodeURIComponent(String(userId))}`;

        const [viewsRes, leadsRes] = await Promise.all([
          fetch(`${base}${proxy ? '&endpoint=views' : '/views'}`),
          fetch(`${base}${proxy ? '&endpoint=leads' : '/leads'}`),
        ]);

        if (!viewsRes.ok || !leadsRes.ok) {
          throw new Error('Failed to fetch analytics from server');
        }

        const viewsData = await viewsRes.json();
        const leadsData = await leadsRes.json();

        // Normalize data to the shape { listing, views } and { listing, leads }
        setViews(
          viewsData.map((r: any) => ({
            listing: r.listing ?? r.name ?? `#${r.id}`,
            views: Number(r.views ?? 0),
          }))
        );

        setLeads(
          leadsData.map((r: any) => ({
            listing: r.listing ?? r.name ?? `#${r.id}`,
            leads: Number(r.leads ?? 0),
          }))
        );
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [userId, proxy]);

  if (loading) return <div className="flex justify-center"><Spin /></div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;
  if (!views.length && !leads.length) return <div className="text-center">No analytics data yet.</div>;

  return (
    <div className="space-y-12">
      <Card title={<Title level={4} style={{ margin: 0 }}>Views per Listing</Title>} bordered={false} style={{ boxShadow: '0 2px 8px #f0f1f2' }}>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={views}>
                <XAxis dataKey="listing" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" />
              </BarChart>
            </ResponsiveContainer>
          </Col>

          <Col xs={24} md={12}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={views} dataKey="views" nameKey="listing" cx="50%" cy="50%" outerRadius={100} label>
                  {views.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </Card>

      <Card title={<Title level={4} style={{ margin: 0 }}>Leads per Listing</Title>} bordered={false} style={{ boxShadow: '0 2px 8px #f0f1f2' }}>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leads}>
                <XAxis dataKey="listing" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="leads" />
              </BarChart>
            </ResponsiveContainer>
          </Col>
          <Col xs={24} md={12}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={leads} dataKey="leads" nameKey="listing" cx="50%" cy="50%" outerRadius={100} label>
                  {leads.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
