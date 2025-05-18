
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        <main className={`flex-1 p-4 md:p-6 lg:p-8 transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-0' : 'ml-0'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
