import { h, SetupContext, Slots } from 'vue';

export default {
  setup(_: any, { slots, }: SetupContext) {
    console.log({...slots})
    return () =>
      h(
        'button',
        {
          class: '',
        },
        [slots.default && slots.default()],
      );
  },
};
