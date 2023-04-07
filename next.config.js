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
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://devport.swygbro.com/:path*",
        permanent: true,
        basePath: false,
      },
    ];
  },
};

module.exports = nextConfig;
