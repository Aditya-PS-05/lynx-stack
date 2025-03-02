// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
import { assertType, describe, test } from 'vitest'

import type { Source } from '../../../src/index.js'

describe('Config - source.entry', () => {
  test('single entry', () => {
    assertType<Source>({
      entry: './src/index.js',
    })

    assertType<Source>({
      entry: ['./src/prefetch.js', './src/index.js'],
    })

    assertType<Source>({
      entry: {
        foo: 'src/index.js',
      },
    })
  })

  test('multiple entry', () => {
    assertType<Source>({
      entry: {
        foo: 'src/index.js',
        bar: 'src/pages/bar/index.js',
      },
    })

    assertType<Source>({
      entry: {
        foo: ['prefetch.ts', 'src/index.js'],
        bar: 'src/pages/bar/index.js',
      },
    })
  })

  test('entry description', () => {
    assertType<Source>({
      entry: {
        main: {
          import: 'src/index.js',
        },
      },
    })

    assertType<Source>({
      entry: {
        main: {
          import: ['prefetch.ts', 'src/index.js'],
        },
      },
    })

    assertType<Source>({
      entry: {
        main: {
          publicPath: 'https://example.com/',
        },
      },
    })

    assertType<Source>({
      entry: {
        foo: {
          import: ['prefetch.ts', 'src/index.js'],
          publicPath: 'https://example.com/foo/',
        },
        bar: {
          import: ['prefetch.ts', 'src/pages/bar/index.js'],
        },
        baz: {
          publicPath: 'https://example.com/baz/',
        },
      },
    })

    assertType<Source>({
      entry: {
        foo: {
          import: ['prefetch.ts', 'src/index.js'],
          publicPath: 'https://example.com/foo/',
        },
        bar: ['prefetch.ts', 'src/pages/bar/index.js'],
        baz: 'src/index.js',
      },
    })
  })
})
