
import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SitemapGenerator from '@/components/admin/SitemapGenerator';
import SubnavLinksEditor from '@/components/admin/content/SubnavLinksEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SettingsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Settings | CalcMaster Admin</title>
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500 mt-1">Manage application settings and configurations</p>
      </div>

      <Tabs defaultValue="navigation">
        <TabsList className="mb-6">
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>
        
        <TabsContent value="navigation" className="space-y-6">
          <SubnavLinksEditor />
        </TabsContent>
        
        <TabsContent value="sitemap">
          <SitemapGenerator />
        </TabsContent>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure general application settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                General settings will be available here in a future update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
