import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import minify from 'rollup-plugin-babel-minify'
import pkg from './package.json'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'

function output(file, format) {
  return {
    exports: 'named',
    name: 'WireMock',
    file,
    format
  }
}

module.exports = [
  {
    input: './src/index.js',
    output: output(pkg.browser, 'umd'),
    plugins: [
      babel(),
      resolve({jsnext: true, preferBuiltins: true, browser: true}),
      json(),
      commonjs(),
      minify({
        comments: false
      }),
      replace({
        'process.env.NODE_ENV': process.env.NODE_ENV || '"development"'
      })
    ]
  },
  {
    input: './src/index.js',
    external: ['axios'],
    output: [
      output(pkg.main, 'cjs'),
      output(pkg.module, 'es')
    ],
    plugins: [
      babel(),
      resolve({jsnext: true, main: true}),
      commonjs(),
    ]
  }
]
