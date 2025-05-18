
import React from 'react';
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LineChartProps {
  title: string;
  description?: string;
  data: any[];
  dataKey: string;
  lineKey: string;
  lineColor?: string;
}

const LineChart = ({ 
  title, 
  description, 
  data, 
  dataKey, 
  lineKey, 
  lineColor = "#00AFC8" 
}: LineChartProps) => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ReLineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey={dataKey} tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey={lineKey} 
                stroke={lineColor} 
                strokeWidth={2}
                dot={{ stroke: lineColor, strokeWidth: 2, fill: 'white', r: 4 }}
                activeDot={{ stroke: lineColor, strokeWidth: 2, fill: lineColor, r: 6 }}
              />
            </ReLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineChart;
