import { CssExtractWebpackPlugin } from '../../../src';

/** @type {import('webpack').Configuration} */
export default {
  entry: './index.css',
  mode: 'development',
  devtool: false,
  output: {
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: CssExtractWebpackPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    function(compiler) {
      new compiler.webpack.HotModuleReplacementPlugin().apply(compiler);
    },
    new CssExtractWebpackPlugin({
      filename: '[name].css',
    }),
  ],
};
