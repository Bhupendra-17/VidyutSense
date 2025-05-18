
import React from 'react';
import { ChartBar, FileSpreadsheet, LayoutDashboard, FileText } from 'lucide-react';
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
  // Sample data for the data table
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
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'In Stock' 
            ? 'bg-green-50 text-green-700'
            : 'bg-amber-50 text-amber-700'
        }`}>
          {value}
        </span>
      )
    },
  ];

  // Sample insights data
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
  
  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file);
    // In a real app, this would process the file or send it to the server
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Get insights from your business data.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Products"
          value={statsData[0].value}
          trend={statsData[0].trend as 'up' | 'down' | 'neutral'}
          change={statsData[0].change}
          icon={<FileSpreadsheet className="h-4 w-4" />}
          className="animate-fade-in" 
          style={{ animationDelay: '0ms' }}
        />
        <StatCard 
          title="Total Revenue"
          value={statsData[1].value}
          trend={statsData[1].trend as 'up' | 'down' | 'neutral'}
          change={statsData[1].change}
          icon={<ChartBar className="h-4 w-4" />}
          className="animate-fade-in" 
          style={{ animationDelay: '100ms' }}
        />
        <StatCard 
          title="Active Inventory"
          value={statsData[2].value}
          trend={statsData[2].trend as 'up' | 'down' | 'neutral'}
          change={statsData[2].change}
          icon={<LayoutDashboard className="h-4 w-4" />}
          className="animate-fade-in" 
          style={{ animationDelay: '200ms' }}
        />
        <StatCard 
          title="Low Stock Items"
          value={statsData[3].value}
          trend={statsData[3].trend as 'up' | 'down' | 'neutral'}
          change={statsData[3].change}
          icon={<FileSpreadsheet className="h-4 w-4" />}
          className="animate-fade-in" 
          style={{ animationDelay: '300ms' }}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
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
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
          <ShareExportOptions 
            title="Dashboard Sharing & Export" 
            dataSource="Dashboard"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '700ms' }}>
          <DataInsightsChat />
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '800ms' }}>
          <LineChart 
            title="Monthly Sales"
            description="Sales trends across months"
            data={monthlySalesData}
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
          data={categoryData}
          dataKey="name"
          barKey="count"
        />
      </div>
    </div>
  );
};

export default Dashboard;
