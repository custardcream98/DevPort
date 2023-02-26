/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/firebasefunctions/:path*",
        destination: "https://devport-7dfd1.web.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
