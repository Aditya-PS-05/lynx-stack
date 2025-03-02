/// <reference types="vitest/globals" />

import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(__filename);

vi.stubGlobal('lynx', {
  loadLazyBundle: vi.fn(function loadLazyBundle(request) {
    return Promise.resolve().then(() => {
      return require(path.join(__dirname, `${request}.rspack.bundle.cjs`));
    });
  }),
});

it('should work with chunk loading require', async function() {
  await import(
    /* webpackChunkName: 'dynamic' */
    './dynamic.js'
  );
  expect(__webpack_require__.lynx_aci).toHaveProperty('dynamic');
  expect(lynx.loadLazyBundle).toBeCalled();
});
