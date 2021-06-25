const path = require('path');

module.exports = {
  stories: ['../packages/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-storysource', '@storybook/addon-knobs/register'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.module.rules.push({
      test: /\.stories\.js?$/,
      loaders: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: {
          uglyCommentsRegex: [/^eslint-.*/, /^global.*/],
        },
      }, ],
      enforce: 'pre',
    });

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../packages'),
    });

    // Return the altered config
    return config;
  },
};
