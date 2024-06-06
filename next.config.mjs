/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true
      },
  experimental: {
    outputFileTracingIncludes: {
      '/*': ['./blogs/**/*'],
    },
  },
};

export default nextConfig;
