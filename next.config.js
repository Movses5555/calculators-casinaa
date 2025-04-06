/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for development to catch potential issues
  reactStrictMode: true,

  // Enable SWC-based minification for better performance
  swcMinify: true,

  // Configure image domains for Next.js image optimization
  images: {
    domains: ['cdn.gpteng.co', 'lovable-uploads.s3.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow any hostname for remote images
      },
    ],
  },

  // Handle redirects within the app
  async redirects() {
    return [
      {
        source: '/nextjs-preview',
        destination: '/nextjs',
        permanent: false, // Temporary redirect
      },
      {
        source: '/chance/roll-a-dice',
        destination: '/chance-games/roll-a-dice',
        permanent: true, // Permanent redirect
      },
      {
        source: '/chance/flip-a-coin',
        destination: '/chance-games/flip-a-coin',
        permanent: true, // Permanent redirect
      },
      {
        source: '/chance/name-picker-wheel',
        destination: '/chance-games/name-picker-wheel',
        permanent: true, // Permanent redirect
      },
    ];
  },

  env: {
    NEXT_PUBLIC_SITE_URL: 'https://calculators-casinaa.com',
  },
};

module.exports = nextConfig;
