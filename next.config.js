/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/firebasefunctions/:path*",
        destination:
          "https://us-central1-devport-7dfd1.cloudfunctions.net/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
