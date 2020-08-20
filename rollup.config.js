import tsPlugin from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'packages/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm',
  },
  external: ['vue'],
  plugins: [
    nodeResolve(),
    commonjs(),
    tsPlugin(),
    alias({
      resolve: ['.jsx', '.js'],
      entries: {
        '@dewfall/vhooks': '/packages',
      },
    }),
  ],
};
