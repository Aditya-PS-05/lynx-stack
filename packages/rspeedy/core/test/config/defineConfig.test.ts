// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
import { describe, expect, test } from 'vitest'

import { defineConfig } from '../../src/index.js'
import type { Config } from '../../src/index.js'

describe('Config - defineConfig', () => {
  test('defineConfig return identical object', () => {
    const config: Config = {}
    expect(defineConfig(config)).toBe(config)
  })
})
