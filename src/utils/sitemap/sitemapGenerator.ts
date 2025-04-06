
import fs from 'fs';
import path from 'path';

// Interface for sitemap URL entry
interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

// Interface for sitemap configuration
export interface SitemapConfig {
  baseUrl: string;
  outputPath: string;
  routes: string[];
  excludePatterns?: RegExp[];
  defaultLastmod?: string;
  defaultChangefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  defaultPriority?: number;
  customPriorities?: Record<string, number>;
}

/**
 * Generates a sitemap.xml file based on the provided configuration
 */
export const generateSitemap = (config: SitemapConfig): void => {
  const {
    baseUrl,
    outputPath,
    routes,
    excludePatterns = [/\/admin\/.*/], // By default exclude admin routes
    defaultLastmod = new Date().toISOString().split('T')[0],
    defaultChangefreq = 'weekly',
    defaultPriority = 0.7,
    customPriorities = {},
  } = config;

  // Filter out routes based on exclude patterns
  const filteredRoutes = routes.filter(route => {
    // Skip any route that matches exclude patterns
    return !excludePatterns.some(pattern => pattern.test(route));
  });

  // Map routes to sitemap URL entries
  const sitemapUrls: SitemapUrl[] = filteredRoutes.map(route => {
    // Homepage gets highest priority
    const isHomepage = route === '/' || route === '';
    
    // Get custom priority if exists
    const priority = isHomepage 
      ? 1.0 
      : (customPriorities[route] || defaultPriority);
    
    // Build the full URL
    const loc = `${baseUrl.replace(/\/$/, '')}${route === '/' ? '' : route}`;
    
    return {
      loc,
      lastmod: defaultLastmod,
      changefreq: isHomepage ? 'daily' : defaultChangefreq,
      priority,
    };
  });

  // Generate XML content
  const xmlContent = generateSitemapXml(sitemapUrls);

  // Ensure directory exists
  const directory = path.dirname(outputPath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  // Write to file
  fs.writeFileSync(outputPath, xmlContent);
  console.log(`Sitemap generated at: ${outputPath}`);
};

/**
 * Generates the XML content for the sitemap
 */
const generateSitemapXml = (urls: SitemapUrl[]): string => {
  const urlEntries = urls.map(url => `
  <url>
    <loc>${escapeXml(url.loc)}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

/**
 * Escapes XML special characters
 */
const escapeXml = (unsafe: string): string => {
  return unsafe.replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
};

/**
 * Extracts routes from React Router configuration
 */
export const extractRoutesFromRouter = (routes: any[], parentPath: string = ''): string[] => {
  let extractedRoutes: string[] = [];

  const processRoute = (route: any, parentPath: string) => {
    // Skip if no path or element
    if (!route.path) return;
    
    // Build the full path
    const fullPath = route.path.startsWith('/')
      ? route.path
      : `${parentPath}/${route.path}`.replace(/\/\//g, '/');
    
    // Add to extracted routes if not a redirect or catch-all
    if (route.element && !fullPath.includes('*') && !route.redirectTo) {
      extractedRoutes.push(fullPath);
    }
    
    // Process children if any
    if (route.children && Array.isArray(route.children)) {
      extractedRoutes = [
        ...extractedRoutes,
        ...extractRoutesFromRouter(route.children, fullPath)
      ];
    }
  };

  routes.forEach(route => processRoute(route, parentPath));
  return extractedRoutes;
};
