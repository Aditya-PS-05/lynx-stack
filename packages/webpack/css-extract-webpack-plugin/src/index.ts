// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

/**
 * @packageDocumentation
 *
 * This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS and CSSId.
 */

export { CssExtractWebpackPlugin } from './CssExtractWebpackPlugin.js';
export type { CssExtractWebpackPluginOptions } from './CssExtractWebpackPlugin.js';
export type { LoaderOptions } from './loader.js';
export type { LoaderOptions as CssExtractRspackLoaderOptions } from './loader.js';

export { CssExtractRspackPlugin } from './CssExtractRspackPlugin.js';
export type { CssExtractRspackPluginOptions } from './CssExtractRspackPlugin.js';
