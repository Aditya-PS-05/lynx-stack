# @lynx-js/web-worker-runtime

## 0.6.2

### Patch Changes

- 085b99e: feat: add `nativeApp.createJSObjectDestructionObserver`, it is a prerequisite for implementing mts event.
- Updated dependencies [0412db0]
- Updated dependencies [085b99e]
  - @lynx-js/web-constants@0.6.2
  - @lynx-js/web-mainthread-apis@0.6.2
  - @lynx-js/web-worker-rpc@0.6.2

## 0.6.1

### Patch Changes

- 62b7841: feat: add lynx.requireModule in main-thread && \_\_LoadLepusChunk API.

  now the `lynx.requireModule` is available in mts.

- Updated dependencies [62b7841]
  - @lynx-js/web-mainthread-apis@0.6.1
  - @lynx-js/web-constants@0.6.1
  - @lynx-js/web-worker-rpc@0.6.1

## 0.6.0

### Minor Changes

- e406d69: refractor: update output json format

  **This is a breaking change**

  Before this change the style info is dump in Javascript code.

  After this change the style info will be pure JSON data.

  Now we're using the css-serializer tool's output only. If you're using plugins for it, now they're enabled.

### Patch Changes

- Updated dependencies [e406d69]
  - @lynx-js/web-mainthread-apis@0.6.0
  - @lynx-js/web-constants@0.6.0
  - @lynx-js/web-worker-rpc@0.6.0

## 0.5.1

### Patch Changes

- ee340da: feat: add SystemInfo.platform as 'web'. now you can use `SystemInfo.platform`.
- b5ef20e: feat: updateData should also call `updatePage` in main-thread.
- Updated dependencies [c49b1fb]
- Updated dependencies [b5ef20e]
  - @lynx-js/web-constants@0.5.1
  - @lynx-js/web-mainthread-apis@0.5.1
  - @lynx-js/web-worker-rpc@0.5.1

## 0.5.0

### Minor Changes

- 7b84edf: feat: introduce new output chunk format

  **This is a breaking change**

  After this commit, we new introduce a new output format for web platform.

  This new output file is a JSON file, includes all essential info.

  Now we'll add the chunk global scope wrapper on runtime, this will help us to provide a better backward compatibility.

  Also we have a intergrated output file cache for one session.

  Now your `output.filename` will work.

  The split-chunk feature has been temporary removed until the rspeedy team supports this feature for us.

### Patch Changes

- 04607bd: refractor: do not create return endpoint for those rpcs don't need it
- Updated dependencies [04607bd]
- Updated dependencies [3050faf]
- Updated dependencies [7b84edf]
- Updated dependencies [e0f0793]
  - @lynx-js/web-worker-rpc@0.5.0
  - @lynx-js/web-constants@0.5.0
  - @lynx-js/web-mainthread-apis@0.5.0
