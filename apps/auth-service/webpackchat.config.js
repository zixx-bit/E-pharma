const path = require('path');
const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');

// /** @type {import('webpack').Configuration} */
module.exports = {
  target: 'node',

  output: {
    path: path.join(__dirname, '../../dist/apps/auth-service'),
    clean: true,
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },

  resolve: {
    alias: {
      '@packages': path.resolve(__dirname, '../../packages'),
    },
    extensions: ['.ts', '.js'],
  },

  /**
   * 🚨 CRITICAL: Do NOT bundle Prisma
   */
  externals: {
    '@prisma/client': 'commonjs @prisma/client',
    prisma: 'commonjs prisma',
  },

  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: [],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      sourceMaps: true,
    }),
  ],
};
