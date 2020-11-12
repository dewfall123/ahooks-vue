const hooksPrefix = 'vhooks/';

const Router = {
  Request: ['useRequest'],
  Dom: [
    'useSize',
    'useKeyPress',
    'useFullscreen',
    'useDocumentVisibility',
    'useHover',
    'useInViewport',
  ],
  State: ['useToggle', 'useLocalState', 'useThrottle', 'useDebounce'],
  Data: ['useTable'],
  Worker: ['useWorkerFunction'],
};

function getRouterConfig(langPrefix = '/') {
  return [
    {
      text: langPrefix === '/' ? 'Getting started' : '介绍',
      link: `${langPrefix}`,
    },
    ...Object.entries(Router).map(([text, children]) => ({
      text,
      children: children.map((hookName) => ({
        link: `${langPrefix}${hooksPrefix}${hookName}/`,
        text: hookName,
      })),
    })),
  ];
}

module.exports = {
  hooksPrefix,
  getRouterConfig,
};
