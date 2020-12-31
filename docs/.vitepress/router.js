const hooksPrefix = 'hooks/';
const { kebabCase } = require('lodash');

const Router = {
  Request: ['useRequest', 'usePaginatedRequest'],
  Dom: [
    'useSize',
    'useKeyPress',
    'useFullscreen',
    'useDocumentVisibility',
    'useHover',
    'useInViewport',
  ],
  State: ['useToggle', 'useLocalStorageState', 'useThrottle', 'useDebounce'],
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
        link: `${langPrefix}${hooksPrefix}${kebabCase(hookName)}/`,
        text: hookName,
      })),
    })),
  ];
}

module.exports = {
  hooksPrefix,
  getRouterConfig,
};
