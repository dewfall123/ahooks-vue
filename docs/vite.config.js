/**
 * @type {import('vite').UserConfig}
 */
export default {
  optimizeDeps: {
    include: [
      'intersection-observer',
      'localforage',
      'lodash-es',
      'resize-observer-polyfill',
      'screenfull',
      // 'vue-demi',
    ],
    exclude: ['vue-demi'],
  },
};
