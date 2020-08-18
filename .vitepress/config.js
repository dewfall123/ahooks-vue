const hooksPrefix = '/packages/hooks';

module.exports = {
  title: 'vhooks',
  description: 'vue3 工具',
  head: [['link', { href: '/doc' }, '文档']],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: '文档', link: '/doc' },
    ],
    sidebar: [
      {link: `${hooksPrefix}/use-toggle/readme`, text: 'use-toggle'},
      {link: `${hooksPrefix}/use-fullscreen/readme`, text: 'use-fullscreen'},
    ],
  },
};
