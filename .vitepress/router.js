const hooksPrefix = 'vhooks/';

function getRouterConfig(langPrefix = '/') {
  return [
    {
      text: langPrefix === '/' ? 'Getting started' : '快速上手',
      link: `${langPrefix}`,
    },
    {
      text: 'Dom',
      children: [
        'useSize',
        'useFullscreen',
        'useDocumentVisibility',
        'useHover',
        'useInViewport',
      ].map((hookName) => ({
        link: `${langPrefix}${hooksPrefix}${hookName}/`,
        text: hookName,
      })),
    },
    {
      text: 'State',
      children: ['useToggle', 'useLocalState', 'useThrottle'].map(
        (hookName) => ({
          link: `${langPrefix}${hooksPrefix}${hookName}/`,
          text: hookName,
        }),
      ),
    },
    {
      text: 'Worker',
      children: ['useWorkerFunction'].map((hookName) => ({
        link: `${langPrefix}${hooksPrefix}${hookName}/`,
        text: hookName,
      })),
    },
  ];
}

module.exports = {
  hooksPrefix,
  getRouterConfig,
};
