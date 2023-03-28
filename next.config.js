/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["image.tmdb.org", "www.gravatar.com"],
  },
};

module.exports = nextConfig;
