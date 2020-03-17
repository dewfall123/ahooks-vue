import { h, ref } from 'vue';
import Content from '@/views/content';

export default {
  setup() {
    return () => h('div', {}, [h(Content)]);
  },
};
