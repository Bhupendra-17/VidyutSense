import React, { useState } from 'react';
import { ChartBar, FileSpreadsheet, LayoutDashboard, MessageSquare } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';
import FileUploadCard from '@/components/dashboard/FileUploadCard';
import DataInsightsCard from '@/components/dashboard/DataInsightsCard';
import DataTable from '@/components/dashboard/DataTable';
import ShareExportOptions from '@/components/dashboard/ShareExportOptions';
import DataInsightsChat from '@/components/dashboard/DataInsightsChat';
import { statsData, monthlySalesData, categoryData, inventoryStatusData } from '@/data/mockData';

const Dashboard = () => {
  const [showChat, setShowChat] = useState(false);
  const [timeRange, setTimeRange] = useState('30'); // Default to 30 days

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file);
  };

  // Filter monthly sales data based on timeRange
  const filteredMonthlySalesData = monthlySalesData.slice(-parseInt(timeRange));

  // Filter category data similarly (simulate recent categories)
  const filteredCategoryData = categoryData.slice(0, Math.min(categoryData.length, parseInt(timeRange) / 10));

  const tableData = [
    { id: 1, product: 'Laptop', category: 'Electronics', stock: 145, price: '$999.99', status: 'In Stock' },
    { id: 2, product: 'Desk Chair', category: 'Furniture', stock: 32, price: '$249.99', status: 'Low Stock' },
    { id: 3, product: 'Wireless Mouse', category: 'Accessories', stock: 310, price: '$35.99', status: 'In Stock' },
    { id: 4, product: 'Monitor', category: 'Electronics', stock: 12, price: '$349.99', status: 'Low Stock' },
    { id: 5, product: 'Keyboard', category: 'Accessories', stock: 95, price: '$59.99', status: 'In Stock' },
  ];

  const tableColumns = [
    { key: 'product', title: 'Product' },
    { key: 'category', title: 'Category' },
    { key: 'stock', title: 'Stock' },
    { key: 'price', title: 'Price' },
    {
      key: 'status',
      title: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${value === 'In Stock'
          ? 'bg-green-50 text-green-700'
          : 'bg-amber-50 text-amber-700'
          }`}>
          {value}
        </span>
      )
    },
  ];

  const insightsData = [
    {
      title: 'Average Stock Level',
      value: '176 units',
      change: 12,
      trend: 'up' as const,
      changeLabel: 'Compared to last month'
    },
    {
      title: 'Slow-moving Items',
      value: '24 products',
      change: -8,
      trend: 'down' as const,
      changeLabel: 'Reduced from last quarter'
    },
    {
      title: 'Reorder Needed',
      value: '8 products',
      alert: true,
      changeLabel: 'Critical items'
    },
    {
      title: 'Inventory Value',
      value: '$328,450',
      change: 5,
      trend: 'up' as const,
      changeLabel: 'Increased by $15,220'
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Get insights from your business data.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            trend={stat.trend as 'up' | 'down' | 'neutral'}
            change={stat.change}
            icon={
              index % 2 === 0
                ? <FileSpreadsheet className="h-4 w-4" />
                : <ChartBar className="h-4 w-4" />
            }
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <FileUploadCard
            title="Upload Inventory Data"
            description="Upload your CSV or Excel inventory data file"
            onFileUpload={handleFileUpload}
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
          <DataInsightsCard
            title="Inventory Insights"
            description="Quick stats about your inventory"
            insights={insightsData}
          />
        </div>
      </div>

      {/* Chart Filter Controls */}
      <div className="flex items-center justify-end space-x-2">
        <label htmlFor="timeRange" className="text-sm text-muted-foreground">Filter Data:</label>
        <select
          id="timeRange"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border px-2 py-1 rounded text-sm"
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '800ms' }}>
          <LineChart
            title="Monthly Sales"
            description="Sales trends across months"
            data={filteredMonthlySalesData}
            dataKey="month"
            lineKey="sales"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '900ms' }}>
          <PieChart
            title="Inventory Status"
            description="Current inventory distribution"
            data={inventoryStatusData}
            dataKey="value"
            nameKey="name"
            colors={['#00AEC9', '#FFC107', '#F44336']}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <div className="animate-fade-in" style={{ animationDelay: '1000ms' }}>
          <DataTable
            title="Low Stock Products"
            description="Products that need attention"
            data={tableData}
            columns={tableColumns}
          />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '1100ms' }}>
          <BarChart
            title="Products by Category"
            description="Number of products in each category"
            data={filteredCategoryData}
            dataKey="name"
            barKey="count"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
          <ShareExportOptions
            title="Dashboard Sharing & Export"
            dataSource="Dashboard"
          />
        </div>
        <div className="animate-fade-in">
          <button
            onClick={() => setShowChat((prev) => !prev)}
            className="fixed bottom-6 right-6 z-50 bg-vidyut-500 hover:bg-vidyut-600 text-white p-3 rounded-full shadow-lg transition-all"
            aria-label="Chat with AI"
          >
            <MessageSquare className="h-6 w-6" />
          </button>

          {showChat && (
            <DataInsightsChat
              floating
              title="Ask AI"
              description="Talk with your data assistant"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
