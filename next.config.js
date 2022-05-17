module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'dl.airtable.com',
      'www.datocms-assets.com',
      'acegif.com'
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    })

    return config
  }
}
