/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  output: 'export',
  images: { unoptimized: true },
  // No basePath needed for user/org GitHub Pages sites (*.github.io repos)
  // basePath and assetPrefix are only needed for project repos
};

export default nextConfig;


