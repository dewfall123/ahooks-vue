const { getRouterConfig, hooksPrefix } = require('./router');

const base = process.env.NODE_ENV === 'production' ? '/vhooks' : '';

module.exports = {
  title: 'vhooks',
  description: 'vue hooks',
  // head: [['link', { href: '/hooks' }, 'Document']],
  themeConfig: {
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
          { text: 'Guide', link: '/' },
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
  base,
  viteOptions: {},
};
