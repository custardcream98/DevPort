/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/cloudfunctions/:path*",
  //       destination: process.env.DEPLOYED_GCP_URL + "/:path*",
  //     },
  //     {
  //       source: "/api/devfunctions/:path*",
  //       destination: process.env.DEVLOPMENT_GCP_URL + "/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
