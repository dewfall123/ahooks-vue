import{j as n,e as u,l as e,h as t,o as a,c as o,b as l,t as d,d as s}from"./app.96d8b727.js";import"./index.d99f697a.js";var c={setup(){const a=u(0),o=function(a,o){var l;let d;d="function"==typeof a?n(a):a;const s=u(d.value),c=e.exports.debounce((()=>{s.value=d.value}),null!=(l=null==o?void 0:o.wait)?l:1e3,o);return t(d,c),s}(a,{wait:1e3});return{count:a,debouncedValue:o,addCount:function(){a.value++}}}};const r=s(" count: "),i=s(" debouncedValue: ");c.render=function(n,u,e,t,s,c){return a(),o("div",null,[l("p",null,[r,l("span",null,d(t.count),1)]),l("p",null,[i,l("span",null,d(t.debouncedValue),1)]),l("button",{onClick:u[1]||(u[1]=(...n)=>t.addCount&&t.addCount(...n))},"++count")])};export{c as _};
