// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/**
 * @vitest-environment node
 */

import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, test } from 'vitest';
import type { Configuration, Stats, WebpackError } from 'webpack';

function clearDirectory(dirPath: string) {
  let files: string[];

  try {
    files = fs.readdirSync(dirPath);
  } catch {
    return;
  }
  if (files.length > 0) {
    for (const file of files) {
      const filePath = `${dirPath}/${file}`;

      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      } else {
        clearDirectory(filePath);
      }
    }
  }

  fs.rmdirSync(dirPath);
}

async function compareDirectory(actual: string, expected: string) {
  const files = fs.readdirSync(expected);

  for (const file of files) {
    const absoluteFilePath = path.resolve(expected, file);

    const stats = fs.lstatSync(absoluteFilePath);

    if (stats.isDirectory()) {
      return compareDirectory(
        path.resolve(actual, file),
        path.resolve(expected, file),
      );
    } else if (stats.isFile()) {
      const actualContent = fs.readFileSync(path.resolve(actual, file), 'utf8');

      await expect(actualContent).toMatchFileSnapshot(
        path.resolve(expected, file),
      );
    }
  }
}

describe('Webpack TestCases', () => {
  const casesDirectory = path.resolve(__dirname, 'cases');
  const outputDirectory = path.resolve(__dirname, 'js/webpack-case');
  const tests = fs.readdirSync(casesDirectory);

  clearDirectory(outputDirectory);

  for (const directory of tests) {
    test.skipIf(directory.startsWith('.'))(
      `${directory} should compile to the expected result`,
      async () => {
        const { default: webpack } = await import('webpack');
        if (directory === 'serializingBigStrings') {
          clearDirectory(path.resolve(__dirname, '../node_modules/.cache'));
        }

        const directoryForCase = path.resolve(casesDirectory, directory);
        const outputDirectoryForCase = path.resolve(
          outputDirectory,
          directory,
        );
        const webpackConfig = (await import(path.resolve(
          directoryForCase,
          'webpack.config.js',
        )) as { default: Configuration })
          .default;
        const { context } = webpackConfig;

        for (
          const config of ([] as Configuration[]).concat(
            webpackConfig,
          )
        ) {
          Object.assign(
            config,
            {
              mode: config.mode ?? 'none',
              context: directoryForCase,
            },
            config,
            {
              output: Object.assign(
                {
                  path: outputDirectoryForCase,
                  publicPath: 'https://example.com/',
                },
                config.output,
              ),
            },
            context ? { context } : {},
          );
        }

        const stats = await new Promise<Stats>((resolve, reject) => {
          webpack(webpackConfig, (error, stats) => {
            if (error) {
              reject(error);

              return;
            }
            resolve(stats!);
          });
        });

        if (stats?.hasErrors()) {
          const errorsPath = path.join(directoryForCase, './errors.test.js');

          if (fs.existsSync(errorsPath)) {
            const { errors } = stats.compilation;

            const errorFilters = await import(errorsPath) as {
              default: { test(error: WebpackError): boolean }[];
            };

            const filteredErrors = errors.filter(
              (error) =>
                !errorFilters.default.some((errorFilter) =>
                  errorFilter.test(error)
                ),
            );

            if (filteredErrors.length > 0) {
              throw new Error(
                `Errors:\n${
                  filteredErrors.map(error => error.message).join(',\n')
                }`,
              );
            }

            return;
          }

          throw new Error(stats.toString());
        }

        if (stats?.hasErrors() && stats.hasWarnings()) {
          throw new Error(
            stats.toString({
              context: path.resolve(__dirname, '..'),
              errorDetails: true,
              warnings: true,
            }),
          );
        }

        const expectedDirectory = path.resolve(directoryForCase, 'expected');

        if (directory.startsWith('hmr')) {
          let res = fs
            .readFileSync(path.resolve(outputDirectoryForCase, 'main.js'))
            .toString();

          const date = Date.now().toString().slice(0, 6);
          const dateRegexp = new RegExp(`${date}\\d+`, 'gi');

          res = res.replace(dateRegexp, '');

          const matchAll = /__webpack_require__\.h = \(\) => \(("\w.*")\)/i
            .exec(res);

          const replacer = Array.from({ length: matchAll?.[1]?.length ?? 0 });

          res = res.replace(
            /__webpack_require__\.h = \(\) => \(("\w.*")\)/i,
            `__webpack_require__.h = () => ("${replacer.fill('x').join('')}")`,
          );

          fs.writeFileSync(
            path.resolve(outputDirectoryForCase, 'main.js'),
            res,
          );
        }

        await compareDirectory(outputDirectoryForCase, expectedDirectory);

        const warningsFile = path.resolve(directoryForCase, 'warnings.js');

        if (fs.existsSync(warningsFile)) {
          const actualWarnings = stats?.toString({
            all: false,
            warnings: true,
          });

          const warningsFile = path.resolve(directoryForCase, 'warnings.js');

          const expectedWarnings = await import(warningsFile) as {
            default: string;
          };

          expect(
            actualWarnings
              ?.trim()
              .replace(/\*\scss\s.?!/g, '* css /path/to/loader.js!'),
          ).toBe(
            expectedWarnings.default
              .trim()
              .replace(/\*\scss\s.?!/g, '* css /path/to/loader.js!'),
          );
        }
      },
    );
  }
});
