
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartPie, TrendingUp, AlertCircle } from 'lucide-react';

interface InsightItem {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  trend?: 'up' | 'down' | 'neutral';
  alert?: boolean;
}

interface DataInsightsCardProps {
  title: string;
  description?: string;
  insights: InsightItem[];
  className?: string;
}

const DataInsightsCard = ({
  title,
  description,
  insights,
  className,
}: DataInsightsCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <ChartPie className="h-5 w-5 text-vidyut-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{insight.title}</p>
                {insight.changeLabel && (
                  <p className="text-xs text-muted-foreground">{insight.changeLabel}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {insight.trend && insight.trend !== 'neutral' && insight.change && (
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                      insight.trend === 'up'
                        ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                    }`}
                  >
                    {insight.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                    )}
                    {Math.abs(insight.change)}%
                  </span>
                )}
                <span className="font-bold text-base">{insight.value}</span>
                {insight.alert && (
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataInsightsCard;
