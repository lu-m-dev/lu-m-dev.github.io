/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/lu-m-dev.github.io',
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
