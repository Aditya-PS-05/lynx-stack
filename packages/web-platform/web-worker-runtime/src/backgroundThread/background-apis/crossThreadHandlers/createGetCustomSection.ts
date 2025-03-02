// Copyright 2023 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import {
  getCustomSectionsEndpoint,
  type Cloneable,
} from '@lynx-js/web-constants';
import type { Rpc } from '@lynx-js/web-worker-rpc';

export function createGetCustomSection(
  rpc: Rpc,
  customSections: Record<string, Cloneable>,
): (key: string, callback: (object: Cloneable) => void) => void {
  const getCustomSections = rpc.createCall(getCustomSectionsEndpoint);
  return (
    key: string,
    callback: (object: Cloneable) => void,
  ) => {
    if (customSections[key]) {
      callback(customSections[key]);
    }
    getCustomSections(key).then(callback);
  };
}
