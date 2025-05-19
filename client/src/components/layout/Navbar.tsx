import React from 'react';
import { Link } from "react-router-dom";
import { ChartPie, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from '/Logo.png';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  return (
    <div className="border-b bg-white dark:bg-slate-950 sticky top-0 z-30">
      <div className="flex h-16 items-center px-4 w-full mx-auto">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="mr-2 md:mr-4"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <div className="flex items-center gap-2 font-semibold text-lg">
          <img src={Logo} alt="Logo" className="h-12 rounded-full hover:shadow-md shadow-cyan-500" />
          <span className="hidden sm:inline">VidyutSense</span>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative w-full max-w-[200px] md:max-w-[256px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search insights..."
              className="w-full bg-background pl-8"
            />
          </div>

          {/* Auth Buttons */}
          <Link to="/signin">
            <Button variant="ghost" className="text-sm">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="text-sm">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
