/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  distDir: 'out',
  swcMinify: true,

  images: {
    unoptimized: true,
    domains: ['cdn.gpteng.co', 'lovable-uploads.s3.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
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
