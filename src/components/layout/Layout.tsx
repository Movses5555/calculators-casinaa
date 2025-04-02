
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TopNav from "./TopNav";
import Subnav from "./Subnav";
import Sidenav from "./Sidenav";
import Footer from "./Footer";
import PromoSpace from "./PromoSpace";
import SideBanner from "./SideBanner";
import { Sidebar, SidebarProvider, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
  showPromo?: boolean;
  showSideBanner?: boolean;
}

const Layout = ({
  children,
  showPromo = true,
  showSideBanner = true,
}: LayoutProps) => {
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Check if current route is homepage
  const isHomepage = location.pathname === '/';

  // Close sidenav when route changes
  useEffect(() => {
    setSidenavOpen(false);
  }, [location.pathname]);

  const toggleSidenav = () => {
    setSidenavOpen(!sidenavOpen);
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex flex-col min-h-screen w-full font-inter">
        <TopNav toggleSidenav={toggleSidenav} />
        <Subnav />

        {showPromo && <PromoSpace variant="primary" />}

        <div className="flex flex-1">
          {/* Left Featured Tools Banner - Hidden on screens smaller than 1650px and on homepage */}
          {showSideBanner && !isHomepage && (
            <div className="hidden 2xl:block w-64 flex-shrink-0 sticky top-0 h-screen overflow-y-auto scrollbar-hidden bg-white border-r border-gray-100">
              <SideBanner variant="secondary" bannerPosition="left" />
            </div>
          )}

          {/* Left Sidebar Navigation - Fixed position */}
          <Sidebar collapsible="offcanvas" variant="sidebar" className="bg-[#1E2630] text-gray-100 fixed z-20 h-screen">
            <SidebarContent className="h-screen">
              <Sidenav isOpen={sidenavOpen} onClose={() => setSidenavOpen(false)} />
            </SidebarContent>
            <SidebarRail />
          </Sidebar>

          {/* Main content area - takes entire middle section */}
          <div className="flex-1 flex justify-center">
            <main className="w-full max-w-7xl px-4 sm:px-6 pb-12 transition-all duration-300 bg-white">
              <div className="animate-fade-in">{children}</div>
            </main>
          </div>

          {/* Right Side Banner - Hidden first (on smaller screens) and on homepage */}
          {showSideBanner && !isHomepage && (
            <div className="hidden lg:block w-64 flex-shrink-0 sticky top-0 h-screen overflow-y-auto scrollbar-hidden bg-white border-l border-gray-100">
              <SideBanner variant="primary" bannerPosition="right" />
            </div>
          )}
        </div>

        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default Layout;
