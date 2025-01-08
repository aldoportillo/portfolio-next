/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    outputFileTracingIncludes: {
      "/*": ["./blogs/**/*"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/image/**',
      },
    ],
  },
};

export default nextConfig;