
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.gpteng.co', 'lovable-uploads.s3.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Handle redirects
  async redirects() {
    return [
      {
        source: '/nextjs-preview',
        destination: '/nextjs',
        permanent: false,
      },
    ];
  },
  // Environment variables for client-side access
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://calculators-casinaa.com',
  },
};

export default nextConfig;
