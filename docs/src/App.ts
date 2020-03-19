import { h, ref } from 'vue';
import Content from '@/views/content';
import TopBar from './views/top-bar'
import SideBar from './views/side-bar'

export default {
  setup() {
    const className = 'container mx-auto h-full grid grid-rows-layout grid-cols-layout';
    return () => h('main', {
      class: className
    }, [
      h(TopBar, { class: 'col-span-2' }),
      h(SideBar),
      h(Content),
    ]);
  },
};
