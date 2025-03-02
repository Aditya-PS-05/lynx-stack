/*
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
*/
import { Component } from '@lynx-js/web-elements-reactive';

/**
 * @deprecated you can use x-text instead in x-text.
 */
@Component<typeof InlineText>('inline-text', [])
export class InlineText extends HTMLElement {}
