
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadCardProps {
  title: string;
  description?: string;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
  onFileUpload?: (file: File) => void;
  className?: string;
}

const FileUploadCard = ({
  title,
  description,
  acceptedFileTypes = ".csv,.xlsx,.xls",
  maxSizeMB = 10,
  onFileUpload,
  className,
}: FileUploadCardProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert to bytes
    if (selectedFile.size > maxSizeBytes) {
      toast({
        title: "File too large",
        description: `File size should be less than ${maxSizeMB}MB`,
        variant: "destructive"
      });
      return;
    }
    
    // Check file type
    if (acceptedFileTypes && acceptedFileTypes.length > 0) {
      const fileExtension = `.${selectedFile.name.split('.').pop()?.toLowerCase()}`;
      if (!acceptedFileTypes.includes(fileExtension)) {
        toast({
          title: "Invalid file type",
          description: `Please upload a file with extension: ${acceptedFileTypes}`,
          variant: "destructive"
        });
        return;
      }
    }
    
    setFile(selectedFile);
    if (onFileUpload) {
      onFileUpload(selectedFile);
    }
    
    toast({
      title: "File uploaded",
      description: `${selectedFile.name} has been uploaded successfully.`,
    });
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };
  
  const handleDownloadTemplate = () => {
    // In a real application, this would download an actual template file
    toast({
      title: "Template downloaded",
      description: "The template file has been downloaded successfully.",
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging ? "border-vidyut-500 bg-vidyut-50" : "border-slate-300 hover:border-vidyut-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <input
            id="fileInput"
            type="file"
            className="hidden"
            accept={acceptedFileTypes}
            onChange={handleFileChange}
          />
          
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="h-10 w-10 text-vidyut-500 mb-2" />
            <p className="text-sm font-medium">
              {file ? file.name : "Drag and drop your file here or click to browse"}
            </p>
            <p className="text-xs text-muted-foreground">
              {acceptedFileTypes} files up to {maxSizeMB}MB
            </p>
            
            {file && (
              <div className="mt-4 flex items-center gap-2 bg-vidyut-50 px-3 py-1 rounded-full">
                <FileText className="h-4 w-4 text-vidyut-600" />
                <span className="text-sm text-vidyut-800 font-medium truncate max-w-[200px]">
                  {file.name}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4 flex justify-between">
          <Button variant="outline" size="sm" onClick={handleDownloadTemplate}>
            <Download className="mr-2 h-4 w-4" /> Download Template
          </Button>
          
          <Button size="sm" disabled={!file}>
            <Upload className="mr-2 h-4 w-4" /> Process Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploadCard;
