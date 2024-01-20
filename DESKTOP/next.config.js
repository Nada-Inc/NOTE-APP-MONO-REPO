/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', images: { unoptimized: true }, experimental: {
        swcPlugins: [['fluentui-next-appdir-directive', { paths: ['@griffel', '@fluentui'] }]],
    },
}

module.exports = nextConfig
