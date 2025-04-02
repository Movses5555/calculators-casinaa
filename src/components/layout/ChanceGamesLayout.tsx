
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ChanceGamesLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  gameComponent: React.ReactNode;
  contentComponent?: React.ReactNode;
}

const ChanceGamesLayout = ({
  title,
  description,
  children,
  gameComponent,
  contentComponent,
}: ChanceGamesLayoutProps) => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main game area */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
              <CardTitle>{title}</CardTitle>
              <CardDescription className="text-gray-100">{description}</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {gameComponent}
            </CardContent>
          </Card>

          {contentComponent && (
            <Card>
              <CardContent className="p-6">
                {contentComponent}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Information and instructions */}
        <div className="lg:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>About {title}</CardTitle>
              <CardDescription>How to use and understand this tool</CardDescription>
            </CardHeader>
            <CardContent className="p-6 prose prose-sm max-w-none">
              {children}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChanceGamesLayout;
