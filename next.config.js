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
  async redirects() {
    return [
      {
        source: '/engineering-jobs',
        destination: '/jobs/t/engineering',
        permanent: true,
      },
      {
        source: '/product-jobs',
        destination: '/jobs/t/product',
        permanent: true,
      },
      {
        source: '/sales-jobs',
        destination: '/jobs/t/sales',
        permanent: true,
      },
      {
        source: '/marketing-jobs',
        destination: '/jobs/t/marketing',
        permanent: true,
      },
      {
        source: '/people-jobs',
        destination: '/jobs/t/people',
        permanent: true,
      },
      {
        source: '/operations-jobs',
        destination: '/jobs/t/operations',
        permanent: true,
      },
      {
        source: '/non-tech-jobs',
        destination: '/jobs/t/non-tech',
        permanent: true,
      },
      {
        source: '/remote-web3-jobs',
        destination: '/jobs/t/remote',
        permanent: true,
      },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
