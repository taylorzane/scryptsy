// Shared
import replace from 'rollup-plugin-replace'

// Browser
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'

// Node.js
import buble from 'rollup-plugin-buble'

const browser = {
  input: 'lib/scrypt.js',
  output: {
    file: 'dist/scryptsy.browser.js',
    format: 'es',
    name: 'scryptsy'
  },
  plugins: [
    replace({
      delimiters: ['/*', '*/'],
      values: {
        IMPORT_CRYPTO: `
        import { default as pbkdf2Sync } from 'pbkdf2/lib/sync-browser.js'
        var crypto = { pbkdf2Sync }
        `
      }
    }),
    commonjs(),
    resolve({
      preferBuiltins: true,
    }),
    builtins()
  ]
}

const node = {
  input: 'lib/scrypt.js',
  output: {
    file: 'dist/scryptsy.node.js',
    format: 'umd',
    name: 'scryptsy'
  },
  external: ['crypto'],
  plugins: [
    replace({
      delimiters: ['/*', '*/'],
      values: {
        IMPORT_CRYPTO: `import crypto from 'crypto'`
      }
    }),
    buble()
  ]
}

export default [browser, node]
