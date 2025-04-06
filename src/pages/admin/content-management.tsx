
import React, { useState } from "react";
import Head from "next/head";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrendingGamesEditor from "@/components/admin/content/TrendingGamesEditor";
import BestCasinosEditor from "@/components/admin/content/BestCasinosEditor";
import PromoSpacesEditor from "@/components/admin/content/PromoSpacesEditor";

const ContentManagementPage = () => {
  const [activeTab, setActiveTab] = useState("trending-games");
  
  return (
    <div className="container mx-auto p-6">
      <Head>
        <title>Content Management | CalcMaster Admin</title>
      </Head>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-gray-500 mt-1">Manage homepage content sections</p>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="trending-games">Trending Games</TabsTrigger>
          <TabsTrigger value="best-casinos">Best Casinos</TabsTrigger>
          <TabsTrigger value="promo-spaces">Promo Spaces</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trending-games">
          <TrendingGamesEditor />
        </TabsContent>
        
        <TabsContent value="best-casinos">
          <BestCasinosEditor />
        </TabsContent>
        
        <TabsContent value="promo-spaces">
          <PromoSpacesEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagementPage;
