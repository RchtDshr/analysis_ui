import { useState, useEffect } from "react";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { RevenueChart } from "@/components/dashboard/charts/RevenueChart";
import { ChannelChart } from "@/components/dashboard/charts/ChannelChart";
import { DeviceChart } from "@/components/dashboard/charts/DeviceChart";
import { CampaignsTable } from "@/components/dashboard/CampaignsTable";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import {
  keyMetrics,
  revenueData,
  channelData,
  deviceData,
  campaignData,
  generateRandomMetric,
} from "@/data/mockData";

export function DashboardOverview() {
  const [metrics, setMetrics] = useState(keyMetrics);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading and real-time updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Simulate real-time metric updates
    const interval = setInterval(() => {
      setMetrics((prevMetrics) =>
        prevMetrics.map((metric) => ({
          ...metric,
          value:
            metric.id === "1"
              ? `$${generateRandomMetric(284532).toLocaleString()}`
              : metric.id === "2"
              ? `${generateRandomMetric(18293).toLocaleString()}`
              : metric.id === "3"
              ? `${generateRandomMetric(2847).toLocaleString()}`
              : `${generateRandomMetric(23.8, 0.05).toFixed(1)}%`,
          change: generateRandomMetric(metric.change, 0.3),
        }))
      );
    }, 10000); // Update every 10 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6 overflow-x-hidden">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-2xl sm:text-3xl font-bold tracking-tight">
            Dashboard Overview
          </p>
          <p className="text-muted-foreground text-sm sm:text-base">
            Welcome back! Here's what's happening with your campaigns today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-xs sm:text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div id="metrics-grid">
        <MetricsGrid metrics={metrics} />
      </div>

      {/* Charts Grid */}
      <div id="charts-section" className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <div className="md:col-span-2 xl:col-span-2" id="revenue-chart">
          <RevenueChart data={revenueData} />
        </div>
        <div className="md:col-span-1 xl:col-span-2" id="channel-chart">
          <ChannelChart data={channelData} />
        </div>
        <div className="md:col-span-1 xl:col-span-1 xl:col-start-3 xl:row-start-1" id="device-chart">
          <DeviceChart data={deviceData} />
        </div>
        <div className="md:col-span-2 xl:col-span-1 xl:col-start-1 xl:row-start-2" id="activity-feed">
   
            <ActivityFeed />
       
        </div>
      </div>

      {/* Lower Section */}
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-4">
        <div className="xl:col-span-4" id="campaigns-table">
          <CampaignsTable data={campaignData} />
        </div>
        {/* <div className="xl:col-span-1">
        </div> */}
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-8 bg-muted rounded-lg animate-pulse" />
        <div className="h-4 bg-muted rounded animate-pulse" />
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-6 border rounded-lg space-y-3">
            <div className="h-4 bg-muted rounded w-24 animate-pulse" />
            <div className="h-8 bg-muted rounded w-32 animate-pulse" />
            <div className="h-3 bg-muted rounded w-20 animate-pulse" />
          </div>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-6 border rounded-lg">
            <div className="space-y-3 mb-4">
              <div className="h-6 bg-muted rounded w-48 animate-pulse" />
              <div className="h-4 bg-muted rounded w-48 animate-pulse" />
            </div>
            <div className="h-[250px] sm:h-[350px] bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
