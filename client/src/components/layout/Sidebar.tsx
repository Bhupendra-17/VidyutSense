
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  ChartBar, 
  ChartPie, 
  LayoutDashboard, 
  FileSpreadsheet, 
  ChartLine,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/"
  },
  {
    title: "Inventory",
    icon: FileSpreadsheet,
    href: "/inventory"
  },
  {
    title: "Analytics",
    icon: ChartLine,
    href: "/analytics"
  },
  {
    title: "Reports",
    icon: ChartPie,
    href: "/reports"
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings"
  }
];

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  
  return (
    <div 
      className={cn(
        "border-r bg-sidebar transition-all duration-300 ease-in-out",
        isOpen ? "md:w-64 lg:w-72" : "w-0 md:w-16",
        "fixed md:relative h-full z-20"
      )}
    >
      <div className="flex h-full flex-col px-3 py-4 overflow-y-auto">
        <div className="space-y-1 py-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:text-sidebar-foreground whitespace-nowrap",
                location.pathname === item.href
                  ? "bg-sidebar-accent text-sidebar-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50"
              )}
              title={item.title}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className={cn("transition-opacity duration-300", 
                isOpen ? "opacity-100" : "opacity-0 md:hidden"
              )}>
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
