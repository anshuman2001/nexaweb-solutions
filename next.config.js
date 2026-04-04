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

  async redirects() {
    return [
      {
        source: '/gst-ai-agent',
        destination: 'https://gst-ai-agent.onrender.com',
        permanent: false,
      },
      {
        source: '/gst-ai-agent/:path*',
        destination: 'https://gst-ai-agent.onrender.com/:path*',
        permanent: false,
      },
      // keep old URL working too
      {
        source: '/gst-reconcile',
        destination: 'https://gst-ai-agent.onrender.com',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
