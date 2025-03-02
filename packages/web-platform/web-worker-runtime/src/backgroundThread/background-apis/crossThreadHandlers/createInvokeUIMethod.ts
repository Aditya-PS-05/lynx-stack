// Copyright 2023 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import {
  ErrorCode,
  invokeUIMethodEndpoint,
  type NativeApp,
} from '@lynx-js/web-constants';
import type { Rpc } from '@lynx-js/web-worker-rpc';

export function createInvokeUIMethod(rpc: Rpc): NativeApp['invokeUIMethod'] {
  return (
    type,
    identifier,
    component_id,
    method,
    params,
    callback,
    root_unique_id,
  ) => {
    rpc.invoke(invokeUIMethodEndpoint, [
      type,
      identifier,
      component_id,
      method,
      params,
      root_unique_id,
    ]).then(callback).catch((error) => {
      console.error(`[lynx-web] invokeUIMethod failed`, error);
      callback({
        code: ErrorCode.UNKNOWN,
        data: '',
      });
    });
  };
}
