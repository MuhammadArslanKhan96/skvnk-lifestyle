/** @type {import('next').NextConfig} */
const config = {
  images: { 
    domains: ['cdn.sanity.io', 'images.unsplash.com'],
    remotePatterns: [{ hostname: 'cdn.sanity.io' }] },
}

export default config
