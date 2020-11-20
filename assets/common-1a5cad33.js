import{o as e,c as t,y as s,e as r,f as n,s as o,A as a,d as l,F as c,u as i}from"./common-34d19493.js";import"./common-ce15c7a5.js";import{g as p}from"./common-bb12e71c.js";const u={esc:27,tab:9,enter:13,space:32,up:38,left:37,right:39,down:40,delete:[8,46]},y={esc:"Escape",tab:"Tab",enter:"Enter",space:" ",up:["Up","ArrowUp"],left:["Left","ArrowLeft"],right:["Right","ArrowRight"],down:["Down","ArrowDown"],delete:["Backspace","Delete"]},f={ctrl:e=>e.ctrlKey,shift:e=>e.shiftKey,alt:e=>e.altKey,meta:e=>e.metaKey},d=()=>{};function m(e){return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/,"$1").toLowerCase()}function b(e,t){if("number"===m(t))return e.keyCode===t;const s=t.split(".");let r=0;for(const t of s){const s=f[t],n=y[t],o=u[t];(s&&s(e)||(n&&"array"===m(n)?n.includes(e.key):n===e.key)||(o&&"array"===m(o)?o.includes(e.keyCode):o===e.keyCode)||e.key.toUpperCase()===t.toUpperCase())&&r++}return r===s.length}const w=["keydown"];function g(s,r=d,n={}){const{events:o=w,target:a}=n,l=function(e){const t=m(e);return"function"===t?e:"string"===t||"number"===t?t=>b(t,e):"array"===t?t=>e.some((e=>b(t,e))):e?()=>!0:()=>!1}(s);e((()=>{const e=[],s=p(a,window);for(const t of o){const n=e=>{if(l(e))return r(e)};e.push(n),s.addEventListener(t,n)}t((()=>{for(const t of o){const r=e.shift();s.removeEventListener(t,r)}}))}))}var v={setup(){const e=s("");const t=["0","1","2","3","4","5","6","7","8","9"];return g((e=>!t.includes(e.key)),(t=>{var s;s=t.key,e.value=s})),{lastPressedKey:e}}};const k=a(" lastPressedKey: "),K={style:{color:"#f00","font-size":"16px"}};v.render=function(e,t,s,a,c,i){return l(),r("div",null,[n("p",null,[k,n("span",K,o(a.lastPressedKey),1)])])};var h={setup(){const e=s("");function t(t){e.value=t}const r=["a","s","Enter","0","1"];g(r,(e=>{t(e.key)}));const n=["shift.c","meta","ctrl.alt.c","ctrl.alt.space","ctrl.alt.0"];for(const e of n)g(e,(()=>{t(e)}));return{lastPressedKey:e,filterKey:r,CombinationKeys:n}}};const x=n("p",null,"Try pressing the following:",-1),C={style:{display:"flex","flex-wrap":"wrap"}},P={style:{"margin-left":"8px"}},A=a(" lastPressedKey: "),U={style:{color:"#f00","font-size":"16px"}};h.render=function(e,t,s,a,p,u){return l(),r("div",null,[x,n("div",C,[(l(!0),r(c,null,i([...a.filterKey,...a.CombinationKeys],(e=>(l(),r("span",{key:e,style:{padding:"4px 20px",margin:"8px",borderRadius:"2px",background:a.lastPressedKey===e?"rgba(62, 175, 124, 0.6)":"rgb(238, 238, 238)"}},o(e),5)))),128))]),n("p",P,[A,n("span",U,o(a.lastPressedKey),1)])])};var j={setup(){const e=s(0);return g("ArrowUp",(()=>{e.value++})),g(40,(()=>{e.value--})),{count:e}}};const E=n("p",null,"Try pressing the following:",-1),L=n("p",null,[a("1. Press "),n("span",{style:{color:"blue"}},"ArrowUp"),a(" by key to increase.")],-1),D=n("p",null,[a(" 2. Press "),n("span",{style:{color:"blue"}},"ArrowDown"),a(" by keyCode to decrease. ")],-1),z=a(" count: "),R={style:{color:"#f00","font-size":"16px"}};j.render=function(e,t,s,a,c,i){return l(),r("div",null,[E,L,D,n("p",null,[z,n("span",R,o(a.count),1)])])};export{h as a,v as b,j as s};