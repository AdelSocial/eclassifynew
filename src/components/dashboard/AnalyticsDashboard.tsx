"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, Row, Col, Typography } from "antd";
import { analyticsApi } from "@/utils/api";
import { userSignUpData } from "@/redux/reuducer/authSlice";

const { Title } = Typography;

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function AnalyticsDashboard() {
  const UserData = useSelector(userSignUpData);
  const userId = UserData?.id;
  const [views, setViews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function loadAnalytics() {
      try {
        const response = await analyticsApi.getSellerViews({
          seller_id: userId,
        });

        // Handle the response - it's an array directly
        if (response?.data) {
          // Check if response.data is an array or wrapped in data property
          const data = Array.isArray(response.data)
            ? response.data
            : response.data?.data || response.data;

          if (Array.isArray(data) && data.length > 0) {
            // Convert views from string to number for charts
            const formattedData = data.map((item) => ({
              ...item,
              views: parseInt(item.views) || 0,
            }));
            setViews(formattedData);
          }
        }
      } catch (error) {
        console.error("Analytics fetch failed", error);
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, [userId]);

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  if (!userId) {
    return <div>Please log in to view analytics.</div>;
  }

  return (
    <div className="space-y-12">
      <Card title={<Title level={4}>Views per Listing</Title>} bordered={false}>
        {views && views.length > 0 ? (
          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={views}>
                  <XAxis
                    dataKey="listing"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`${value} views`, "Views"]}
                    labelFormatter={(label) => `Listing: ${label}`}
                  />
                  <Bar dataKey="views" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Col>

            <Col xs={24} md={12}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={views}
                    dataKey="views"
                    nameKey="listing"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={(entry: any) => `${entry.listing}: ${entry.views}`}
                  >
                    {views.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.id || index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend
                    formatter={(value: string, entry: any) =>
                      `${value}: ${entry.payload?.views || 0} views`
                    }
                  />
                  <Tooltip
                    formatter={(value: any) => [`${value} views`, "Views"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Col>
          </Row>
        ) : (
          <div>No analytics data available.</div>
        )}
      </Card>
    </div>
  );
}
