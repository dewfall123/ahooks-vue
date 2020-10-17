const path = require('path');
const { getRouterConfig, hooksPrefix } = require('./router');
const packagePath = '/vhooks/';

module.exports = {
  title: 'vhooks',
  description: 'vue hooks',
  // head: [['link', { href: '/hooks' }, 'Document']],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Document', link: `/${hooksPrefix}useSize/` },
    ],
    sidebar: getRouterConfig(),
    lang: 'en-US',
    locales: {
      '/': {
        lang: 'en-US',
        title: 'vHooks',
        description: 'vue hooks',
        // head?: HeadConfig[]
        label: 'English',
        selectText: 'Languages',
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Document', link: `/${hooksPrefix}useSize/` },
        ],
        sidebar: getRouterConfig(),
      },
      '/zh/': {
        lang: 'zh-CN',
        title: 'vHooks',
        description: 'vue hooks',
        // head?: HeadConfig[]
        label: '中文',
        selectText: '语言',
        nav: [
          { text: '指南', link: '/' },
          { text: '文档', link: `/zh/${hooksPrefix}useSize/` },
        ],
        sidebar: getRouterConfig('/zh/'),
      },
    },
    search: {
      searchMaxSuggestions: 10,
    },
    repo: 'dewfall123/vhooks',
    repoLabel: 'Github',
    lastUpdated: true,
    prevLink: true,
    nextLink: true,
  },
  alias: {
    '@dewfall/vhooks': '/vhooks/',
    'vue-demi': 'vue',
    '/vhooks/': '/packages/vhooks/src/',
  },
  outDir: 'docs/',
  // TODO
  // base: '/vhooks',
  viteOptions: {},
};
