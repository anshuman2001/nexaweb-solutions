/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/gst-reconcile',
        destination: 'https://gst-ai-agent.onrender.com/gst-reconcile',
      },
      {
        source: '/gst-reconcile/login',
        destination: 'https://gst-ai-agent.onrender.com/gst-reconcile/login',
      },
      {
        source: '/gst-api/:path*',
        destination: 'https://gst-ai-agent.onrender.com/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
