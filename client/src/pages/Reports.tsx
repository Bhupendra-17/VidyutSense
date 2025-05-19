import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartPie,
  FileText,
  FileSpreadsheet,
  Download,
  MessageSquare,
  X,
} from "lucide-react";
import ShareExportOptions from '@/components/dashboard/ShareExportOptions';
import DataInsightsChat from '@/components/dashboard/DataInsightsChat';

const Reports = () => {
  const [activeTab, setActiveTab] = useState("inventory");
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="relative space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Generate and download reports for your business.</p>
      </div>

      <Tabs defaultValue="inventory" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
          {activeTab === "inventory" && (
            <>
              <ReportCard title="Inventory Summary" description="Overview of your current inventory status" icon={<FileText />} />
              <ReportCard title="Low Stock Items" description="List of products with low inventory levels" icon={<FileSpreadsheet />} />
              <ReportCard title="Inventory Valuation" description="Total value of inventory by category" icon={<ChartPie />} />
            </>
          )}

          {activeTab === "sales" && (
            <>
              <ReportCard title="Sales Summary" description="Overview of your sales performance" icon={<FileText />} />
              <ReportCard title="Top Selling Products" description="Products with highest sales volume" icon={<FileSpreadsheet />} />
              <ReportCard title="Sales by Category" description="Sales distribution across product categories" icon={<ChartPie />} />
            </>
          )}

          {activeTab === "analytics" && (
            <>
              <ReportCard title="Business Analytics" description="Comprehensive business performance metrics" icon={<FileText />} />
              <ReportCard title="Growth Trends" description="Key growth indicators over time" icon={<ChartPie />} />
              <ReportCard title="Category Performance" description="Detailed analysis of product categories" icon={<FileSpreadsheet />} />
            </>
          )}
        </div>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="col-span-1 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <ShareExportOptions
            title="Report Sharing & Export"
            description="Share and export your generated reports"
            dataSource="Reports"
          />
        </div>
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

interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ReportCard: React.FC<ReportCardProps> = ({ title, description, icon }) => (
  <Card className="dashboard-card">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-lg font-medium">{title}</CardTitle>
      <div className="h-8 w-8 text-vidyut-500">{icon}</div>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-sm">{description}</CardDescription>
    </CardContent>
    <CardFooter>
      <Button className="w-full">
        <Download className="mr-2 h-4 w-4" /> Generate Report
      </Button>
    </CardFooter>
  </Card>
);

export default Reports;
