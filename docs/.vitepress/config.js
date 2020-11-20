const { getRouterConfig, hooksPrefix } = require('./router');
const { kebabCase } = require('lodash');

const base = process.env.NODE_ENV === 'production' ? '/ahooks-vue' : '';

module.exports = {
  title: 'ahooks-vue',
  description: 'vue hooks',
  themeConfig: {
    lang: 'en-US',
    locales: {
      '/': {
        lang: 'en-US',
        title: 'ahooks-vue',
        description: 'vue hooks',
        label: 'English',
        selectText: 'Languages',
        nav: [
          { text: 'Guide', link: '/' },
          { text: 'Document', link: `/${hooksPrefix}${kebabCase('useSize')}/` },
        ],
        sidebar: getRouterConfig(),
      },
      '/zh/': {
        lang: 'zh-CN',
        title: 'ahooks-vue',
        description: 'vue hooks',
        label: '中文',
        selectText: '语言',
        nav: [
          { text: '指南', link: '/zh' },
          { text: '文档', link: `/zh/${hooksPrefix}${kebabCase('useSize')}/` },
        ],
        sidebar: getRouterConfig('/zh/'),
      },
    },
    search: {
      searchMaxSuggestions: 10,
    },
    repo: 'dewfall123/ahooks-vue',
    repoLabel: 'Github',
    lastUpdated: true,
    prevLink: true,
    nextLink: true,
  },
  srcIncludes: ['packages/vhooks/src'],
  alias: {
    'ahooks-vue': '/@packages/vhooks/src/',
    'vue-demi': 'vue',
  },
  outDir: '../dist',
  base,
  viteOptions: {},
};
