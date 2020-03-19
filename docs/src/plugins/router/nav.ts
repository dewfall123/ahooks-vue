import { RouteRecord } from 'vue-router/dist/src/types';

const requireFn = require.context('@/views/content/hooks', true, /\.ts$/);
// eg: ["./state/useToggle.ts"]
const paths = requireFn.keys();
const navTree = {} as Record<string, Record<string, string>>;
const routes = [] as RouteRecord[];
for (const path of paths) {
  try {
    const [_, type, name] = path.match(/\.\/([a-z|A-Z]+)\/([a-z|A-Z]+)\.ts$/) as RegExpMatchArray;
    const link = `/${type}/${name}`;
    if (navTree[type]) {
      navTree[type][name] = link;
    } else {
      navTree[type] = { [name]: link };
    }
    routes.push({ path: link, component: async () => requireFn(path) });
  } catch {
    // do nothing
  }
}

export { navTree, routes };
