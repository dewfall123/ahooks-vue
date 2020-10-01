const fs = require("fs");
const exclude = ["utils", "index.ts", "__tests__"];

const special = {
    useStore: 'export { useStore, createStore, useState, useGetters, useMutations } from "./useStore";\n',
    useRequest:`export { useRequest, useRequestConfig } from "./useRequest";\n`
};

const files = fs
    .readdirSync("../")
    .filter((name) => !exclude.includes(name))
    .map((name) => name.split(".")[0]);

fs.writeFileSync(
    "../index.ts",
    files.reduce((total, name) => {
        total += special[name] || `export { default as ${name} } from './${name}';\n`;
        return total;
    }, "")
);

console.log("done");
