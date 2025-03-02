import { RuntimeWrapperWebpackPlugin } from '../../../../src';

/** @type {import('webpack').Configuration} */
export default {
  plugins: [
    new RuntimeWrapperWebpackPlugin({
      injectVars(defaultInjectVars) {
        return defaultInjectVars.map(name => {
          if (name === 'Component') {
            return '__Component';
          }
          return name;
        });
      },
    }),
  ],
};
