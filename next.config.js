/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gcdnb.pbrd.co',
      },
      {
        protocol: 'http',
        hostname: 'purecatamphetamine.github.io',
      },
    ],
  },
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
}

module.exports = nextConfig
