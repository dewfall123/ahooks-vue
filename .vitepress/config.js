const hooksPrefix = '/packages/hooks';

module.exports = {
  title: 'vue3-utilities',
  description: 'vue3 工具',
  head: [['link', { href: '/doc' }, '文档']],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: '文档', link: '/doc' },
    ],
    sidebar: [
      {link: `${hooksPrefix}/use-toggle/readme`, text: 'use-toggle'},
    ],
  },
};
