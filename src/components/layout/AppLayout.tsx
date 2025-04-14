
import React from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Home, BarChart2, Award, User, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
}

const NavItem = ({ to, icon: Icon, label, active }: NavItemProps) => {
  return (
    <Link to={to}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 px-2 py-6",
          active && "bg-eco-softgray text-eco-primary font-medium"
        )}
      >
        <Icon size={20} className={cn(active ? "text-eco-primary" : "text-eco-neutral")} />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

const AppSidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <Sidebar className="border-r border-eco-softgray">
      <SidebarHeader className="py-6 px-4 border-b border-eco-softgray">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-eco-primary flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-eco-primary to-eco-skyblue inline-block text-transparent bg-clip-text">
            EcoTrack
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="py-4">
        <div className="space-y-1 px-2">
          <NavItem to="/" icon={Home} label="Dashboard" active={path === "/"} />
          <NavItem to="/activities" icon={BarChart2} label="Activities" active={path === "/activities"} />
          <NavItem to="/challenges" icon={Award} label="Challenges" active={path === "/challenges"} />
          <NavItem to="/profile" icon={User} label="Profile" active={path === "/profile"} />
        </div>
      </SidebarContent>
      <SidebarFooter className="py-4 px-4 border-t border-eco-softgray">
        <div className="text-xs text-eco-neutral">
          EcoTrack v1.0 © 2025
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="flex items-center justify-between p-4 border-b md:hidden">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-eco-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-eco-primary to-eco-skyblue inline-block text-transparent bg-clip-text">
                EcoTrack
              </span>
            </div>
            <SidebarTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={20} />
              </Button>
            </SidebarTrigger>
          </div>
          <div className="p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
