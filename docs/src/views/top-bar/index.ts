import { h } from 'vue';
import logo from '@/assets/imgs/logo.svg';

export default {
  setup() {
    const className = 'h-20 border-b border-gary-300 flex justify-arround items-center';
    return () =>
      h(
        'header',
        {
          class: className,
        },
        [
          h('img', {
            src: logo,
            class: 'h-16',
          }),
        ],
      );
  },
};
