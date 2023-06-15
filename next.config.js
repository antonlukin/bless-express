const nextSettings = {
  output: 'export',
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
}

if (process.env.LOCAL_SERVER) {
  delete nextSettings.output

  nextSettings.rewrites = async () => {
    return [
      {
        source: '/share/:path*',
        destination: 'https://bless.notset.org/share/:path*',
      },
    ]
  }
}

module.exports = nextSettings
