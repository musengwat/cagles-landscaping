/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: false,
    loader: 'custom',
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  transpilePackages: ['next-image-export-optimizer'],
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public/images',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: '75',
    nextImageExportOptimizer_storePicturesInWEBP: 'true',
  },
  trailingSlash: true,
  eslint: {
    dirs: ['src'],
  },
};

module.exports = nextConfig;