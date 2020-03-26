import { h } from 'vue';
import { Link } from 'vue-router';
import { navTree } from '@/plugins/router/nav';

export default {
  setup() {
    return () =>
      h('aside', {}, [
        h('div', {}, [
          Object.keys(navTree).map(type =>
            h(
              'ul',
              {
                key: type,
              },
              [
                h('li', {}, type),
                ...Object.entries(navTree[type]).map(link =>
                  h(
                    Link,
                    {
                      key: link[1],
                      to: link[1],
                      class: 'block',
                    },
                    () => link[0],
                  ),
                ),
              ],
            ),
          ),
        ]),
      ]);
  },
};
