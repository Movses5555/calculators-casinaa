
import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, 
  Bug, 
  Settings, 
  LogOut, 
  Package, 
  Tag, 
  SlidersHorizontal, 
  Monitor,
  Edit
} from "lucide-react";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import AdminTopNav from "./AdminTopNav";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    // Implement logout functionality
    navigate("/admin/login");
  };

  return (
    <SidebarProvider defaultOpen={!collapsed}>
      <div className="flex min-h-screen w-full bg-[#f8f9fa]">
        <Sidebar variant="sidebar">
          <SidebarHeader className="flex items-center p-4 h-[64px]">
            <div className="flex items-center space-x-2 px-2">
              <Monitor className="w-8 h-8 text-[#4ad481]" />
              <span className="font-bold text-xl">Admin</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate("/admin/dashboard")}
                  tooltip="Dashboard"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate("/admin/bug-tracker")}
                  tooltip="Bug Tracker"
                >
                  <Bug className="w-5 h-5" />
                  <span>Bug Tracker</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarSeparator />
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate("/admin/feature-tools")}
                  tooltip="Feature Tools"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  <span>Feature Tools</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate("/admin/sponsored-listings")}
                  tooltip="Sponsored Listings"
                >
                  <Tag className="w-5 h-5" />
                  <span>Sponsored Listings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate("/admin/promo-spaces")}
                  tooltip="Promo Spaces"
                >
                  <Package className="w-5 h-5" />
                  <span>Promo Spaces</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate("/admin/content-management")}
                  tooltip="Content Management"
                >
                  <Edit className="w-5 h-5" />
                  <span>Content Management</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarSeparator />
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate("/admin/settings")}
                  tooltip="Settings"
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="p-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-start" 
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span>Logout</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex flex-col flex-1">
          <AdminTopNav />
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
