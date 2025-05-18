
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, Search } from 'lucide-react';

interface DataTableColumn {
  key: string;
  title: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface DataTableProps {
  title: string;
  description?: string;
  data: any[];
  columns: DataTableColumn[];
  searchable?: boolean;
  downloadable?: boolean;
  className?: string;
}

const DataTable = ({
  title,
  description,
  data,
  columns,
  searchable = true,
  downloadable = true,
  className,
}: DataTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredData = searchTerm 
    ? data.filter(item => 
        columns.some(column => 
          item[column.key] && 
          item[column.key].toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;
    
  const handleDownloadCSV = () => {
    // Create CSV content
    const headers = columns.map(col => col.title).join(',');
    const rows = data.map(item => 
      columns
        .map(col => {
          const value = item[col.key];
          // Handle values with commas by wrapping in quotes
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        })
        .join(',')
    ).join('\n');
    
    const csvContent = `${headers}\n${rows}`;
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '-')}-data.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          
          {downloadable && (
            <Button variant="outline" size="sm" onClick={handleDownloadCSV}>
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          )}
        </div>
        
        {searchable && (
          <div className="mt-2 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search data..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                {columns.map((column) => (
                  <th 
                    key={column.key}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, rowIndex) => (
                  <tr 
                    key={rowIndex} 
                    className={`border-b hover:bg-muted/20 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                  >
                    {columns.map((column) => (
                      <td 
                        key={`${rowIndex}-${column.key}`}
                        className="px-4 py-3 text-sm"
                      >
                        {column.render 
                          ? column.render(item[column.key], item)
                          : item[column.key]
                        }
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-6 text-center text-muted-foreground">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataTable;
