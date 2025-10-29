/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

// GitHub Pages repo name (used for basePath/assetPrefix). Update if repo changes.
const repoName = 'gxu0904';

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  output: 'export',
  images: { unoptimized: true },
  basePath: isProd ? `/${repoName}` : undefined,
  assetPrefix: isProd ? `/${repoName}/` : undefined,
};

export default nextConfig;


