
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  change?: number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const StatCard = ({
  title,
  value,
  trend = 'neutral',
  change,
  description,
  icon,
  className,
  style
}: StatCardProps) => {
  return (
    <Card className={`stat-card ${className || ''}`} style={style}>
      <div className="flex items-center justify-between">
        <h3 className="stat-title">{title}</h3>
        {icon && <div className="text-vidyut-500">{icon}</div>}
      </div>
      <p className="stat-value">{value}</p>
      {(trend !== 'neutral' && change !== undefined) && (
        <div className="flex items-center space-x-1">
          <span
            className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium ${
              trend === 'up'
                ? 'text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400'
                : 'text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400'
            }`}
          >
            {trend === 'up' ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
            )}
            {change}%
          </span>
          {description && <span className="text-xs text-muted-foreground">{description}</span>}
        </div>
      )}
      {trend === 'neutral' && description && (
        <p className="stat-description">{description}</p>
      )}
    </Card>
  );
};

export default StatCard;
