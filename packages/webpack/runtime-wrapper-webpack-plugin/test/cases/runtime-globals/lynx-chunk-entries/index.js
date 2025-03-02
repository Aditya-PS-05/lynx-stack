/// <reference types="vitest/globals" />

import { RuntimeGlobals } from '@lynx-js/webpack-runtime-globals';

const entriesKey = RuntimeGlobals.lynxChunkEntries.slice('lynx.'.length);

expect(lynx).toHaveProperty(entriesKey);
expect(lynx[entriesKey]).toHaveProperty('main', '__Card__');
