/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gcdnb.pbrd.co',
      },
      {
        protocol: 'https',
        hostname: 'purecatamphetamine.github.io',
      },
      { hostname: 'cdn.sanity.io' },
    ],
  },
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
}

module.exports = nextConfig
