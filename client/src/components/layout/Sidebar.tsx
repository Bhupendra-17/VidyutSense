import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileSpreadsheet,
  ChartLine,
  ChartPie,
  Settings,
} from "lucide-react";

const sidebarItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
  { title: "Analytics", icon: ChartLine, href: "/analytics" },
  { title: "Inventory", icon: FileSpreadsheet, href: "/inventory" },
  { title: "Reports", icon: ChartPie, href: "/reports" },
  { title: "Settings", icon: Settings, href: "/settings" },
];

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();

  return (
    <div
      className={cn(
        "fixed z-20 h-screen border-r bg-sidebar transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "w-56" : "w-16"
      )}
    >
      <div className="flex h-full flex-col px-3 py-4 overflow-hidden">
        <div className="space-y-1 py-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.title}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-sidebar-foreground whitespace-nowrap",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span
                  className={cn(
                    "transition-all duration-300",
                    isOpen ? "opacity-100 ml-1" : "opacity-0 ml-[-8px] pointer-events-none"
                  )}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
