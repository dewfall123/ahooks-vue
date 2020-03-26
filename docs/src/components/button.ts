import { h, SetupContext, Slots } from 'vue';

export default {
  setup(_: any, { slots }: SetupContext) {
    const className = 'border border-gary-700 rounded p-1';
    return () =>
      h(
        'button',
        {
          class: className,
        },
        [slots.default && slots.default()],
      );
  },
};
