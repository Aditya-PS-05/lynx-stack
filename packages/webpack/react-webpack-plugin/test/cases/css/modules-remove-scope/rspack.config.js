import { CssExtractRspackPlugin } from '@lynx-js/css-extract-webpack-plugin';

import { ReactWebpackPlugin } from '../../../../src';

/** @type {import('@rspack/core').Configuration} */
export default {
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  jsx: false,
                },
              },
            },
          },
          {
            loader: ReactWebpackPlugin.loaders.MAIN_THREAD,
            options: {
              enableRemoveCSSScope: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: CssExtractRspackPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                namedExport: false,
              },
            },
          },
        ],
      },
    ],
  },
  experiments: {
    css: false,
  },
  plugins: [
    new CssExtractRspackPlugin({
      filename: 'rspack.bundle.css',
    }),
    new ReactWebpackPlugin(),
    /**
     * @param {import('@rspack/core').Compiler} compiler
     */
    (compiler) => {
      new compiler.webpack.BannerPlugin({
        banner: `var globDynamicComponentEntry;`,
        raw: true,
        test: /\.js$/,
      }).apply(compiler);
    },
  ],
};
