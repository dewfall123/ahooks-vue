import { h } from 'vue';
import { useFullScreen } from 'v-hooks';
import button from '@/components/button';

export default {
  setup() {
    const { ref, setFull, exitFull, toggleFull, isFullscreen } = useFullScreen();
    const className = 'bg-white';
    return () =>
      h('div', { ref, class: className }, [
        h('p', {}, isFullscreen ? 'isFullscreen' : 'notFullscreen'),
        h(
          button,
          {
            onClick: setFull,
          },
          () => 'setfull',
        ),
        h(
          button,
          {
            onClick: exitFull,
          },
          () => 'exitFull',
        ),
        h(
          button,
          {
            onClick: toggleFull,
          },
          () => 'toggleFull',
        ),
      ]);
  },
};
