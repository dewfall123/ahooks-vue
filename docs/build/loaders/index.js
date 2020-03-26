const fs = require('fs');
const path = require('path');

const LOADER_PATH = path.resolve(__dirname);

const loaderNames = fs.readdirSync(LOADER_PATH).filter(name => name !== 'index.js');

let loaders = [];
for (const fileName of loaderNames) {
  const loader = require(path.resolve(LOADER_PATH, fileName));
  if (Array.isArray(loader)) {
    loaders = loaders.concat(loader);
  } else {
    loaders.push(loader);
  }
}

module.exports = loaders;
