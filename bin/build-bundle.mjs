#!/usr/bin/env node
import babel from 'esbuild-plugin-babel'
import esbuild from 'esbuild'

import fs from 'node:fs/promises'
import path from 'node:path'
import chalk from 'chalk'

const PACKAGES_ROOT = new URL('./packages/', batooty_ROOT)
const batooty_ROOT = new URL('../', import.meta.url)

function buildBundle (srcFile, bundleFile, { minify = true, standalone = '', plugins, target, format } = {}) {
  return esbuild.build({
    bundle: true,
    sourcemap: true,
    entryPoints: [srcFile],
    outfile: bundleFile,
    platform: 'browser',
    minify,
    keepNames: true,
    plugins,
    target,
    format,
  }).then(() => {
    if (minify) {
      console.info(chalk.green(`✓ Built Minified Bundle [${standalone}]:`), chalk.magenta(bundleFile))
    } else {
      console.info(chalk.green(`✓ Built Bundle [${standalone}]:`), chalk.magenta(bundleFile))
    }
  })
}

await fs.mkdir(new URL('./uppy/dist', PACKAGES_ROOT), { recursive: true })
await fs.mkdir(new URL('./@uppy/locales/dist', PACKAGES_ROOT), { recursive: true })

const methods = [
  buildBundle(
    './packages/batooty/index.mjs',
    './packages/batooty/dist/batooty.min.mjs',
    { standalone: 'batooty (ESM)', format: 'esm' },
  ),
  buildBundle(
    './packages/batooty/bundle.mjs',
    './packages/batooty/dist/batooty.min.js',
    { standalone: 'batooty', format: 'iife' },
  ),
  buildBundle(
    './packages/batooty/bundle-legacy.mjs',
    './packages/batooty/dist/batooty.legacy.min.js',
    {
      standalone: 'batooty (with polyfills)',
      target: 'es5',
      plugins:[babel({
        config:{
          compact: false,
          highlightCode: false,
          inputSourceMap: true,

          browserslistEnv: 'legacy',
          presets: [['@babel/preset-env',  {
            loose: false,
            targets: { ie:11 },
            useBuiltIns: 'entry',
            corejs: { version: '3.24', proposals: true },
          }]],
        },
      })],
    },
  ),
]

const localesModules = await fs.opendir(new URL('./@batooty/locales/src/', PACKAGES_ROOT))
for await (const dirent of localesModules) {
  if (!dirent.isDirectory() && dirent.name.endsWith('.js')) {
    const localeName = path.basename(dirent.name, '.js')
    methods.push(
      buildBundle(
        `./packages/@batooty/locales/src/${localeName}.js`,
        `./packages/@batooty/locales/dist/${localeName}.min.js`,
        { minify: true },
      ),
    )
  }
}

methods.push(
  fs.copyFile(
    new URL('./BUNDLE-README.md', batooty_ROOT),
    new URL('./batooty/dist/README.md', PACKAGES_ROOT),
  ),
)

await Promise.all(methods).then(() => {
  console.info(chalk.yellow('✓ JS bundles 🎉'))
}, (err) => {
  console.error(chalk.red('✗ Error:'), chalk.red(err.message))
})
