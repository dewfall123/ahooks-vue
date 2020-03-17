import { h, watch, ref, watchEffect } from 'vue';
// import { useToggle } from 'vue3-hooks';
// import { useToggle } from '../../../../src';
import { useToggle } from 'v-hooks';
import Button from '@/components/button';

export default {
  setup() {
    const { state, toggle } = useToggle();
    // const state = ref(false);
    // const toggle = () => (state.value = !state.value);

    // watch(state, () => {
    //   console.log(state.value);
    // });

    return () =>
      h('div', [
        h('p', null, state.value),
        h(
          Button,
          {
            onClick: () => {
              console.log(state.value);
              debugger;
              toggle();
            },
          },
          () => 'toggle',
        ),
      ]);
  },
};
