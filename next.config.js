/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent webpack from bundling firebase-admin — it uses native Node.js modules
  // (grpc, crypto) that must be required at runtime, not inlined by webpack.
  serverExternalPackages: ['firebase-admin'],

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
        destination: 'https://gst-ai-agent.onrender.com/',
      },
      {
        source: '/gst-reconcile/:path*',
        destination: 'https://gst-ai-agent.onrender.com/:path*',
      },
      {
        source: '/gst-ai-agent',
        destination: 'https://gst-ai-agent.onrender.com/',
      },
      {
        source: '/gst-ai-agent/:path*',
        destination: 'https://gst-ai-agent.onrender.com/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
