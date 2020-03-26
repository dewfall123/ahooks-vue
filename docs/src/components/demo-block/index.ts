import { h } from 'vue';

interface DemoBlockProps {
  path: string;
}

export default {
  setup(props: DemoBlockProps) {
    const component = require.context('@/views/content/hooks', true, /\.ts$/);

    return () => h('div', {}, []);
  },
};
