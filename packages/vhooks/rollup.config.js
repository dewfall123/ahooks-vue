import tsPlugin from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  external: ['vue'],
  plugins: [
    nodeResolve(),
    commonjs(),
    tsPlugin(),
    alias({
      resolve: ['.jsx', '.js'],
      entries: {
        '@dewfall/vhooks': 'src/',
      },
    }),
  ],
};
