
import React, { useState } from 'react';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';
import DataTable from '@/components/dashboard/DataTable';
import FileUploadCard from '@/components/dashboard/FileUploadCard';
import ShareExportOptions from '@/components/dashboard/ShareExportOptions';
import DataInsightsChat from '@/components/dashboard/DataInsightsChat';
import { monthlySalesData, categoryData, inventoryStatusData } from '@/data/mockData';
import { MessageSquare } from "lucide-react";

const Analytics = () => {
  // Sample data for analytics
  const analyticsTableData = [
    { metric: 'Sales Growth', current: '15.2%', previous: '12.5%', change: '+2.7%' },
    { metric: 'Customer Retention', current: '78.4%', previous: '72.1%', change: '+6.3%' },
    { metric: 'Avg Order Value', current: '$145.50', previous: '$132.25', change: '+$13.25' },
    { metric: 'Conversion Rate', current: '3.8%', previous: '3.2%', change: '+0.6%' },
    { metric: 'Return Rate', current: '4.2%', previous: '5.1%', change: '-0.9%' },
  ];

  const metricsColumns = [
    { key: 'metric', title: 'Metric' },
    { key: 'current', title: 'Current Period' },
    { key: 'previous', title: 'Previous Period' },
    {
      key: 'change',
      title: 'Change',
      render: (value: string) => {
        const isPositive = value.startsWith('+');
        return (
          <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {value}
          </span>
        );
      }
    },
  ];

  const handleAnalyticsFileUpload = (file: File) => {
    console.log('Analytics file uploaded:', file);
    // In a real app, this would process the file or send it to the server
  };
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Visualize your business data and gain insights.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <FileUploadCard
            title="Upload Data for Analysis"
            description="Upload your CSV or Excel data file for advanced analytics"
            onFileUpload={handleAnalyticsFileUpload}
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <DataTable
            title="Key Performance Metrics"
            description="Comparing current and previous periods"
            data={analyticsTableData}
            columns={metricsColumns}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
          <LineChart
            title="Monthly Sales Trends"
            description="Sales performance over time"
            data={monthlySalesData}
            dataKey="month"
            lineKey="sales"
            lineColor="#3B82F6"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
          <BarChart
            title="Products by Category"
            description="Distribution of products across categories"
            data={categoryData}
            dataKey="name"
            barKey="count"
            barColor="#8B5CF6"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="animate-fade-in" style={{ animationDelay: '700ms' }}>
          <PieChart
            title="Inventory Status"
            description="Current inventory distribution"
            data={inventoryStatusData}
            dataKey="value"
            nameKey="name"
            colors={['#3B82F6', '#8B5CF6', '#EC4899']}
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '800ms' }}>
          <BarChart
            title="Monthly Revenue"
            description="Revenue trends across months"
            data={monthlySalesData.map(item => ({
              ...item,
              revenue: item.sales * 5.5
            }))}
            dataKey="month"
            barKey="revenue"
            barColor="#EC4899"
          />
        </div>


      </div>
      <div className="mx-20 self-center animate-fade-in min-w-screen" style={{ animationDelay: '300ms' }}>
        <ShareExportOptions
          title="Analytics Sharing & Export"
          dataSource="Analytics"
        />
      </div>
      <div className="animate-fade-in" >
        {/* Floating Chat Toggle Button */}
        <button
          onClick={() => setShowChat((prev) => !prev)}
          className="fixed bottom-6 right-6 z-50 bg-vidyut-500 hover:bg-vidyut-600 text-white p-3 rounded-full shadow-lg transition-all"
          aria-label="Chat with AI"
        >
          <MessageSquare className="h-6 w-6" />
        </button>

        {/* Floating Chat Window */}
        {showChat && (
          <DataInsightsChat
            floating
            title="Ask AI"
            description="Talk with your data assistant"
          />
        )}
      </div>

    </div>
  );
};

export default Analytics;
