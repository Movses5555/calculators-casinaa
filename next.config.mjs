
/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
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
      {
        source: '/chance/roll-a-dice',
        destination: '/chance-games/roll-a-dice',
        permanent: true,
      },
      {
        source: '/chance/flip-a-coin',
        destination: '/chance-games/flip-a-coin',
        permanent: true,
      },
      {
        source: '/chance/name-picker-wheel',
        destination: '/chance-games/name-picker-wheel',
        permanent: true,
      },
    ];
  },
  // Environment variables for client-side access
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://calculators-casinaa.com',
  },
};

export default nextConfig;
