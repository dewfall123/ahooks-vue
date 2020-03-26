import { h } from 'vue';
import test from './test.md';
import testT from './testT.vue';
console.log(testT);
// console.log(test);

export default {
  setup() {
    return () => h('div', [ h(testT)]);
  },
};
