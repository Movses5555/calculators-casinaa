
import { runSitemapGenerator } from './generateSitemap';

// This file is used when generating sitemap from the command line
// It won't be executed in the browser
export const runSitemapCli = () => {
  console.log('Starting sitemap generation...');
  runSitemapGenerator();
  console.log('Sitemap generation complete.');
};
