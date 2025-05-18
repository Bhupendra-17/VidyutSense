
import React from 'react';
import { PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PieChartProps {
  title: string;
  description?: string;
  data: any[];
  dataKey: string;
  nameKey: string;
  colors?: string[];
  innerRadius?: number;
  outerRadius?: number;
  className?: string;
}

const defaultColors = ["#00AEC9", "#006978", "#33BFD3", "#66CFE0", "#99DFE9"];

const PieChart = ({ 
  title, 
  description, 
  data, 
  dataKey, 
  nameKey, 
  colors = defaultColors,
  innerRadius = 70,
  outerRadius = 100,
  className
}: PieChartProps) => {
  const totalValue = data.reduce((sum, item) => sum + item[dataKey], 0);
  
  // Custom tooltip formatter to show percentage
  const tooltipFormatter = (value: number) => {
    const percentage = ((value / totalValue) * 100).toFixed(1);
    return [`${value} (${percentage}%)`, ''];
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="#fff" 
        textAnchor="middle" 
        dominantBaseline="central"
        style={{ fontSize: '12px', fontWeight: 'bold' }}
      >
        {percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ''}
      </text>
    );
  };

  return (
    <Card className={`dashboard-card ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RePieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={2}
                dataKey={dataKey}
                nameKey={nameKey}
                labelLine={false}
                label={renderCustomizedLabel}
                animationBegin={0}
                animationDuration={1200}
              >
                {data.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]} 
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
                }}
                formatter={tooltipFormatter}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                iconSize={10}
              />
            </RePieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChart;
