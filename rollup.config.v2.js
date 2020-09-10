import tsPlugin from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import replace from '@rollup/plugin-replace';

export default {
  input: 'packages/index.ts',
  output: {
    file: 'dist-v2/index.js',
    format: 'esm',
  },
  external: ['@vue/composition-api', 'vue'],
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
    replace({
      "'vue'": "'@vue/composition-api'",
      delimiters: ['', ''],
    }),
  ],
};
