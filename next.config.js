/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    mapbox_key: 'pk.eyJ1Ijoic2VldGFtLWRpdmthciIsImEiOiJjbGgyY3QyNGgxY2dlM2VyenFzbzFua3F4In0.hB1jVykXYXRQA8lMnXY8ng'
  }
}

module.exports = nextConfig
