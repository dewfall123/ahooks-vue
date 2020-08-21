const hooksPrefix = '/packages/hooks';

const sideBar = ['useToggle', 'useFullscreen', 'useLocalState'].map(
  hookName => ({
    link: `${hooksPrefix}/${hookName}/readme`,
    text: hookName,
  }),
);

module.exports = {
  title: 'vhooks',
  description: 'vue3 工具',
  head: [['link', { href: '/doc' }, '文档']],
  themeConfig: {
    nav: [
      { text: 'Home1', link: '/' },
      { text: '文档', link: '/doc' },
    ],
    sidebar: sideBar,
    search: true,
    searchMaxSuggestions: 10,
  },
  alias: { '@dewfall/vhooks': '/packages', '@/': '/packages/' },
};
