const hooksPrefix = '/packages/hooks';

const sideBar = [
  {
    link: '/dom',
    text: 'Dom',
    children: [
      'useFullscreen',
      'useDocumentVisibility',
      'useHover',
      'useInViewport',
      'useSize',
    ].map(hookName => ({
      link: `${hooksPrefix}/${hookName}/readme`,
      text: hookName,
    })),
  },
  {
    link: '/state',
    text: 'State',
    children: ['useUrlState', 'useToggle', 'useLocalState'].map(hookName => ({
      link: `${hooksPrefix}/${hookName}/readme`,
      text: hookName,
    })),
  },
];

module.exports = {
  title: 'vhooks',
  description: 'vue3 工具',
  head: [['link', { href: '/doc' }, '文档']],
  themeConfig: {
    nav: [
      { text: 'Home1', link: '/' },
      { text: '文档', link: hooksPrefix },
    ],
    sidebar: sideBar,
    search: true,
    searchMaxSuggestions: 10,
  },
  alias: { '@dewfall/vhooks': '/packages' },
};
