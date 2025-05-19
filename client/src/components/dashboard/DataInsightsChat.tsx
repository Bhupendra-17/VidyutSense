
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface DataInsightsChatProps {
  title?: string;
  description?: string;
  className?: string;
  floating?: boolean;
}

const DataInsightsChat = ({
  title = "Data Insights Chat",
  description = "Ask questions about your data",
  className,
  floating = false, // NEW
}: DataInsightsChatProps) => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your data assistant. You can ask me questions about your data such as 'What are the top selling products?' or 'Show me inventory trends'.",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your data, sales have increased by 12% in the last quarter.",
        "Your inventory levels are optimal for most products, but 5 items are running low.",
        "I notice a seasonal pattern in your sales data, with peaks in December and June.",
        "Your top selling product category is Electronics, followed by Furniture.",
        "Product ID 12345 has the highest profit margin at 42%.",
        "There's a strong correlation between marketing spend and sales in your data.",
        "Looking at the trends, I'd recommend restocking these items soon: Laptop X1, Office Chair Pro, Wireless Mouse M3."
      ];
      
      const responseMessage: Message = {
        id: Date.now().toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prevMessages => [...prevMessages, responseMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Card className={`${
        floating
          ? 'fixed bottom-20  right-6 w-full max-w-md md:max-w-sm lg:max-w-[33%] shadow-2xl z-50'
          : className
      }`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <MessageSquare className="h-5 w-5 text-vidyut-500" />
        </div>
      </CardHeader>
      <CardContent>
  <div className="flex flex-col max-h-[calc(100vh-5rem)] overflow-hidden">
    {/* Scrollable Chat Messages */}
    <ScrollArea className="flex-1 pr-4 overflow-y-auto">
      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`flex gap-2 max-w-[75%] ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <Avatar
                className={`h-8 w-8 ${
                  msg.sender === 'user' ? 'bg-vidyut-500' : 'bg-slate-500'
                }`}
              >
                {msg.sender === 'user' ? (
                  <User className="h-5 w-5" />
                ) : (
                  <MessageSquare className="h-5 w-5" />
                )}
              </Avatar>
              <div
                className={`rounded-lg px-4 py-2 text-sm ${
                  msg.sender === 'user'
                    ? 'bg-vidyut-500 text-white'
                    : 'bg-muted'
                }`}
              >
                {msg.content}
                <div
                  className={`text-xs mt-1 ${
                    msg.sender === 'user'
                      ? 'text-white/70'
                      : 'text-muted-foreground'
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-2 max-w-[75%]">
              <Avatar className="h-8 w-8 bg-slate-500">
                <MessageSquare className="h-5 w-5" />
              </Avatar>
              <div className="rounded-lg px-4 py-2 text-sm bg-muted">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-slate-400 animate-pulse"></div>
                  <div
                    className="h-2 w-2 rounded-full bg-slate-400 animate-pulse"
                    style={{ animationDelay: '200ms' }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-slate-400 animate-pulse"
                    style={{ animationDelay: '400ms' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>

    {/* Chat Input */}
    <div className="flex gap-2 mt-4">
      <Input
        placeholder="Ask about your data..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        className="flex-1"
      />
      <Button
        onClick={handleSendMessage}
        disabled={!message.trim() || isLoading}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  </div>
</CardContent>

    </Card>
  );
};

export default DataInsightsChat;
