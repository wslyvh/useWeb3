module.exports = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 180,
  images: {
    domains: [
      'dl.airtable.com',
      'avatars.githubusercontent.com',
      'camo.githubusercontent.com',
      'www.datocms-assets.com',
      'acegif.com',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
