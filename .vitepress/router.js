const hooksPrefix = '/vhooks/';

const routerConfig = [
  { text: 'Getting started', link: '/' },
  {
    text: 'Dom',
    children: [
      'useFullscreen',
      'useDocumentVisibility',
      'useHover',
      'useInViewport',
      'useSize',
    ].map((hookName) => ({
      link: `${hooksPrefix}${hookName}/`,
      text: hookName,
    })),
  },
  {
    text: 'State',
    children: ['useToggle', 'useLocalState', 'useThrottle'].map((hookName) => ({
      link: `${hooksPrefix}${hookName}/`,
      text: hookName,
    })),
  },
  {
    text: 'Worker',
    children: ['useWorkerFunction'].map((hookName) => ({
      link: `${hooksPrefix}${hookName}/`,
      text: hookName,
    })),
  },
];

module.exports = {
  hooksPrefix,
  routerConfig,
};
