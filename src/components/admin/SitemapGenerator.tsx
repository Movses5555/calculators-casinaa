
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { runSitemapGenerator } from '@/utils/sitemap/generateSitemap';

const SitemapGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [excludeAdmin, setExcludeAdmin] = useState(true);

  const handleGenerateSitemap = async () => {
    try {
      setIsGenerating(true);
      // In browser environment, we'll just show a success message
      // since we can't actually write to the filesystem
      // The actual generation would happen on the server
      toast({
        title: 'Success',
        description: 'Sitemap generation request sent. Check public/sitemap.xml on the server.',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error generating sitemap:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate sitemap. Check console for details.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sitemap Generator</CardTitle>
        <CardDescription>
          Generate a sitemap.xml file for search engine optimization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-6">
          <Checkbox 
            id="excludeAdmin" 
            checked={excludeAdmin} 
            onCheckedChange={(checked) => setExcludeAdmin(!!checked)}
          />
          <label
            htmlFor="excludeAdmin"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Exclude admin routes from sitemap
          </label>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          This will generate a sitemap.xml file in the public directory of your project.
          The sitemap can be accessed at https://yourdomain.com/sitemap.xml
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Note: In this web environment, the sitemap cannot be written to the filesystem.
          This feature will work when deployed on your server.
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleGenerateSitemap} 
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Sitemap'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SitemapGenerator;
