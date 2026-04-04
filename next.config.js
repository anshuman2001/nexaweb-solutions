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
        source: '/gst-reconcile/:path*',
        destination: 'https://gst-ai-agent.onrender.com/gst-reconcile/:path*',
      },
      {
        source: '/gst-ai-agent',
        destination: 'https://gst-ai-agent.onrender.com/gst-reconcile',
      },
      {
        source: '/gst-ai-agent/:path*',
        destination: 'https://gst-ai-agent.onrender.com/gst-reconcile/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
