const { routerConfig, hooksPrefix } = require('./router');
const packagePath = '/packages/vhooks/src/';

module.exports = {
  title: 'vhooks',
  description: 'vue hooks',
  head: [['link', { href: '/hooks' }, 'Document']],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Document', link: hooksPrefix },
    ],
    sidebar: routerConfig,
    search: {
      // placeholder: '',
      searchMaxSuggestions: 10,
    },
    repo: 'dewfall123/vhooks',
    repoLabel: 'Github',
    lastUpdated: true,
    prevLink: true,
    nextLink: true,
  },
  alias: {
    '@dewfall/vhooks': packagePath,
    'vue-demi': 'vue',
    [hooksPrefix]: packagePath,
  },
  outDir: 'docs/dist',
  // TODO
  // base: '/vhooks',
  viteOptions: {},
};
