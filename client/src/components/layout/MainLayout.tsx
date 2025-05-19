
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        {/* Sidebar  */}
        <div
          className={`
            fixed top-16 left-0 z-20 h-[calc(100vh-4rem)] 
            bg-white dark:bg-slate-900 border-r transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            
          `}
        ><Sidebar isOpen={sidebarOpen} />
        </div>
        
        {/* Main Content */}
        <main
          className={`flex-1 ${sidebarOpen ? 'ml-52' : 'ml-12'}  p-4 md:p-6 lg:p-8 transition-all duration-1000 ease-in-out `}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
