import { h } from 'vue';
import { View } from 'vue-router';

export default {
  setup() {
    return () => h(View);
  },
};
