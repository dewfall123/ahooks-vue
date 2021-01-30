/**
 * @type {import('vite').UserConfig}
 */
export default {
  optimizeDeps: {
    include: [
      'intersection-observer',
      'localforage',
      'lodash',
      'resize-observer-polyfill',
      'screenfull',
      // 'vue-demi',
      'mockjs',
      'axios',
    ],
    exclude: ['vue-demi'],
  },
};
