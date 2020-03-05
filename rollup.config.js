import tsPlugin from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm',
  },
  external: [
    'vue'
  ],
  plugins: [
    nodeResolve(),
    tsPlugin(),
  ],
};
