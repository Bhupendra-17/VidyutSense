
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, Download, FileText, File, Files } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareExportOptionsProps {
  title?: string;
  description?: string;
  dataSource?: string;
  className?: string;
  onExportPdf?: () => void;
  onExportExcel?: () => void;
  onExportCsv?: () => void;
}

const ShareExportOptions = ({
  title = "Share & Export",
  description = "Share your data or export it in various formats",
  dataSource = "Dashboard",
  className,
  onExportPdf,
  onExportExcel,
  onExportCsv
}: ShareExportOptionsProps) => {
  const [shareLink, setShareLink] = useState<string>("");
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const { toast } = useToast();

  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const handleGenerateLink = () => {
    // In a real app, this would generate a unique link to the backend
    const newLink = `https://vidyutsense.app/shared/${dataSource.toLowerCase()}/${generateRandomId()}`;
    setShareLink(newLink);
    setLinkCopied(false);
    toast({
      title: "Link generated",
      description: "Share link has been created successfully",
    });
  };

  const handleCopyLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setLinkCopied(true);
      toast({
        title: "Link copied",
        description: "Share link has been copied to clipboard",
      });
    }
  };

  const handleExportPdf = () => {
    if (onExportPdf) {
      onExportPdf();
    } else {
      // Default implementation
      toast({
        title: "PDF Export",
        description: `Exporting ${dataSource} as PDF...`,
      });
      // In a real app, this would trigger a PDF download
      setTimeout(() => {
        toast({
          title: "Export completed",
          description: `${dataSource} has been exported as PDF`,
        });
      }, 1500);
    }
  };

  const handleExportExcel = () => {
    if (onExportExcel) {
      onExportExcel();
    } else {
      // Default implementation
      toast({
        title: "Excel Export",
        description: `Exporting ${dataSource} as Excel...`,
      });
      // In a real app, this would trigger an Excel download
      setTimeout(() => {
        toast({
          title: "Export completed",
          description: `${dataSource} has been exported as Excel`,
        });
      }, 1500);
    }
  };

  const handleExportCsv = () => {
    if (onExportCsv) {
      onExportCsv();
    } else {
      // Default implementation
      toast({
        title: "CSV Export",
        description: `Exporting ${dataSource} as CSV...`,
      });
      // In a real app, this would trigger a CSV download
      setTimeout(() => {
        toast({
          title: "Export completed",
          description: `${dataSource} has been exported as CSV`,
        });
      }, 1500);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="share" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="share">Share</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>
          
          <TabsContent value="share" className="space-y-4 mt-2">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Share this data</h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleGenerateLink}
                >
                  <Link className="h-4 w-4 mr-2" />
                  Generate Link
                </Button>
              </div>
              
              {shareLink && (
                <div className="mt-2">
                  <div className="flex gap-2">
                    <Input 
                      value={shareLink} 
                      readOnly 
                      className="font-mono text-xs"
                    />
                    <Button 
                      onClick={handleCopyLink}
                      variant={linkCopied ? "default" : "outline"}
                    >
                      {linkCopied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    This link will allow others to view this {dataSource.toLowerCase()}.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="export" className="space-y-4 mt-2">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Export options</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleExportPdf}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleExportExcel}
                >
                  <File className="h-4 w-4 mr-2" />
                  Excel
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleExportCsv}
                >
                  <Files className="h-4 w-4 mr-2" />
                  CSV
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Export your data in various formats for offline analysis.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ShareExportOptions;
