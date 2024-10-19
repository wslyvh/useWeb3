module.exports = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 180,
  images: {
    domains: ['dl.airtable.com', 'avatars.githubusercontent.com', 'camo.githubusercontent.com', 'www.datocms-assets.com', 'acegif.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  async redirects() {
    return [
      {
        source: '/gas',
        destination: 'https://www.ethgastracker.com/',
        permanent: true,
      },
      {
        source: '/gas/arbitrum',
        destination: 'https://www.ethgastracker.com/network/arbitrum',
        permanent: true,
      },
      {
        source: '/gas/base',
        destination: 'https://www.ethgastracker.com/network/base',
        permanent: true,
      },
      {
        source: '/gas/optimism',
        destination: 'https://www.ethgastracker.com/network/optimism',
        permanent: true,
      },
    ]
  },
}
