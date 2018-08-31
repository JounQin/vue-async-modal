import buble from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'
import vue from 'rollup-plugin-vue'

const pkg = require('./package.json')

const NODE_ENV = process.env.NODE_ENV || 'development'

const isProd = NODE_ENV === 'production'

const plugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
  }),
  vue({
    css: false,
    compileOptions: {
      preserveWhitespace: !isProd,
    },
  }),
  buble({
    objectAssign: 'Object.assign',
  }),
]

if (isProd) {
  plugins.push(
    uglify({
      output: {
        comments: true,
      },
    }),
  )
}

export default {
  input: 'lib/index.js',
  output: {
    amd: {
      id: 'vue-async-modal',
    },
    banner: `/*!
 * ${pkg.name} ${pkg.description}
 * Version ${pkg.version}
 * Copyright (C) 2017 JounQin <admin@1stg.me>
 * Released under the MIT license
 *
 * Github: https://github.com/JounQin/vue-async-modal
 */`,
    file: `dist/vue-async-modal${isProd ? '.min' : ''}.js`,
    format: 'umd',
    globals: {
      vue: 'Vue',
    },
    name: 'VueAsyncModal',
  },
  external: ['vue'],
  plugins,
}
