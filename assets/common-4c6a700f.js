import{y as t}from"./common-34d19493.js";function o(o=!1,e){const s=t(o),a=t=>{s.value=t},i=void 0===e?!o:e;return{state:s,toggle:t=>{void 0===t&&(t=s.value===o?i:o),a(t)},setLeft:()=>{a(o)},setRight:()=>{a(i)}}}export{o as u};