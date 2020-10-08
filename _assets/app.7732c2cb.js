import{r as e,m as t,n,i as o,w as r,o as s,a as i,b as a,h as l,c,d as u,e as d,f as p,g as h,t as m,j as f,k as v,l as g,p as w,v as k,q as b,F as y,s as x,u as L,x as S,y as C,z as T,A as j,B as $,C as q,D as B}from"./common-a14a00e4.js";const E=Symbol();function O(){return function(){const e=o(E);if(!e)throw new Error("useRouter() is called without provider.");return e}().route}function _(e,t,n=!1){const o=document.getElementById("app").offsetTop,r=e.classList.contains(".header-anchor")?e:document.querySelector(decodeURIComponent(t));if(r){const e=r.offsetTop-o-15;!n||Math.abs(e-window.scrollY)>window.innerHeight?window.scrollTo(0,e):window.scrollTo({left:0,top:e,behavior:"smooth"})}}function A(e,t){const n=Array.from(document.querySelectorAll("meta"));let o=!0;const s=e=>{o?o=!1:(n.forEach(e=>document.head.removeChild(e)),n.length=0,e&&e.length&&e.forEach(e=>{const t=function([e,t,n]){const o=document.createElement(e);for(const e in t)o.setAttribute(e,t[e]);n&&(o.innerHTML=n);return o}(e);document.head.appendChild(t),n.push(t)}))};r(()=>{const n=e.value,o=t.value,r=n&&n.title;document.title=(r?r+" | ":"")+o.title,s([["meta",{charset:"utf-8"}],["meta",{name:"viewport",content:"width=device-width,initial-scale=1"}],["meta",{name:"description",content:o.description}],...o.head,...n&&n.frontmatter.head||[]])})}const M=Symbol();function z(){const e=o(M);if(!e)throw new Error("usePageData() is called without provider.");return e}const I="undefined"!=typeof window;function D(e){let t=e.replace(/\.html$/,"");if(t.endsWith("/")&&(t+="index"),I){const e="/vhooks/";t=t.slice(e.length).replace(/\//g,"_")+".md";t=`${e}_assets/${t}.${__VP_HASH_MAP__[t]}.js`}else t=`./${t.slice(1).replace(/\//g,"_")}.md.js`;return t}const V=new Set,N=()=>document.createElement("link");let H;const P=I&&(H=N())&&H.relList&&H.relList.supports&&H.relList.supports("prefetch")?e=>{const t=N();t.rel="prefetch",t.href=e,document.head.appendChild(t)}:e=>{const t=new XMLHttpRequest;t.open("GET",e,t.withCredentials=!0),t.send()};const F={setup(){const e=O();return function(){if(!I)return;if(!window.IntersectionObserver)return;let e;if((e=navigator.connection)&&(e.saveData||/2g/.test(e.effectiveType)))return;const t=window.requestIdleCallback||setTimeout;let n=null;const o=()=>{n&&n.disconnect(),n=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){const t=e.target;n.unobserve(t);const{pathname:o}=t;if(!V.has(o)){V.add(o);const e=D(o);P(e)}}})}),t(()=>{document.querySelectorAll(".vitepress-content a").forEach(e=>{const{target:t,hostname:o,pathname:r}=e;"_blank"!==t&&o===location.hostname&&(r!==location.pathname?n.observe(e):V.add(r))})})};s(o),i(o),a(()=>{n&&n.disconnect()})}(),()=>e.contentComponent?l(e.contentComponent):null}};var R={setup:()=>({})};const U={t:"1596458734865",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"4898","xmlns:xlink":"http://www.w3.org/1999/xlink",width:"16",height:"16"},W=d("path",{d:"M68.608 962.56V206.848h740.864V962.56H68.608zM746.496 271.36H131.584v629.248h614.912V271.36zM131.584 262.144","p-id":"4899",fill:"#666"},null,-1),J=d("path",{d:"M219.136 65.024v116.224h62.976V129.536h614.912v629.248h-60.416v61.952h123.392V65.024z","p-id":"4900",fill:"#666"},null,-1);R.render=function(e,t,n,o,r,s){return c(),u("svg",U,[W,J])};var K={setup:()=>({})};const G={t:"1596458647160",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"2840","xmlns:xlink":"http://www.w3.org/1999/xlink",width:"22",height:"22"},Y=d("path",{d:"M311.1 739c-6.1 0-12.2-2.3-16.8-7L69.7 507.4l224.6-224.6c9.3-9.3 24.3-9.3 33.6 0s9.3 24.3 0 33.6l-191 191 191 191c9.3 9.3 9.3 24.3 0 33.6-4.6 4.7-10.7 7-16.8 7zM711.5 739c-6.1 0-12.2-2.3-16.8-7-9.3-9.3-9.3-24.3 0-33.6l191-191-191-191c-9.3-9.3-9.3-24.3 0-33.6s24.3-9.3 33.6 0L953 507.4 728.3 732c-4.6 4.7-10.7 7-16.8 7zM418.5 814.7c-2.4 0-4.8-0.4-7.2-1.1-12.5-4-19.4-17.3-15.5-29.8l179.6-567.1c4-12.5 17.3-19.4 29.8-15.5 12.5 4 19.4 17.3 15.5 29.8L441.1 798.1a23.73 23.73 0 0 1-22.6 16.6z",fill:"#666","p-id":"2841"},null,-1);K.render=function(e,t,n,o,r,s){return c(),u("svg",G,[Y])};var X={};const Q={version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 1024 1024","xml:space":"preserve"},Z=d("g",null,[d("path",{d:"M1004.57 319.408l-468-312c-15.974-9.83-33.022-9.92-49.142 0l-468 312C7.428 327.406 0 341.694 0 355.978v311.998c0 14.286 7.428 28.572 19.43 36.572l468 312.044c15.974 9.83 33.022 9.92 49.142 0l468-312.044c12-7.998 19.43-22.286 19.43-36.572V355.978c-0.002-14.284-7.43-28.572-19.432-36.57zM556 126.262l344.572 229.716-153.714 102.858L556 331.406V126.262z m-88 0v205.144l-190.858 127.43-153.714-102.858L468 126.262zM88 438.264l110.286 73.714L88 585.692v-147.428z m380 459.43L123.428 667.978l153.714-102.858L468 692.55v205.144z m44-281.716l-155.43-104 155.43-104 155.43 104-155.43 104z m44 281.716V692.55l190.858-127.43 153.714 102.858L556 897.694z m380-312.002l-110.286-73.714L936 438.264v147.428z","p-id":"2793",fill:"#555"})],-1);X.render=function(e,t,n,o,r,s){return c(),u("svg",Q,[Z])};var ee={};const te={t:"1547088289967",class:"icon",style:{},viewBox:"0 0 1170 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"1952","xmlns:xlink":"http://www.w3.org/1999/xlink"},ne=d("path",{d:"M1028.571429 441.142857q63.428571 26.285714 102.571428 83.142857T1170.285714 650.857143q0 93.714286-67.428571 160.285714T940 877.714286q-2.285714 0-6.571429-0.285715t-6-0.285714H232q-97.142857-5.714286-164.571429-71.714286T0 645.142857q0-62.857143 31.428571-116t84-84q-6.857143-22.285714-6.857142-46.857143 0-65.714286 46.857142-112t113.714286-46.285714q54.285714 0 98.285714 33.142857 42.857143-88 127.142858-141.714286t186.571428-53.714285q94.857143 0 174.857143 46T982.571429 248.571429t46.571428 172q0 3.428571-0.285714 10.285714t-0.285714 10.285714zM267.428571 593.142857q0 69.714286 48 110.285714t118.857143 40.571429q78.285714 0 137.142857-56.571429-9.142857-11.428571-27.142857-32.285714T519.428571 626.285714q-38.285714 37.142857-82.285714 37.142857-31.428571 0-53.428571-19.142857T361.714286 594.285714q0-30.285714 22-49.714285t52.285714-19.428572q25.142857 0 48.285714 12t41.714286 31.428572 37.142857 42.857142 39.428572 46.857143 44 42.857143 55.428571 31.428572 69.428571 12q69.142857 0 116.857143-40.857143T936 594.857143q0-69.142857-48-109.714286t-118.285714-40.571428q-81.714286 0-137.714286 55.428571l53.142857 61.714286q37.714286-36.571429 81.142857-36.571429 29.714286 0 52.571429 18.857143t22.857143 48q0 32.571429-21.142857 52.285714t-53.714286 19.714286q-24.571429 0-47.142857-12t-41.142857-31.428571-37.428572-42.857143-39.714286-46.857143-44.285714-42.857143-55.142857-31.428571T434.285714 444.571429q-69.714286 0-118.285714 40.285714T267.428571 593.142857z","p-id":"1953",fill:"#666"},null,-1);ee.render=function(e,t,n,o,r,s){return c(),u("svg",te,[ne])};var oe={};const re={t:"1547088313123",class:"icon",style:{},viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"2783","xmlns:xlink":"http://www.w3.org/1999/xlink"},se=d("path",{d:"M737.828571 166.857143l0.457143-0.228572h0.228572L512 36.571429 285.6 166.628571h-0.228571l0.8 0.342858L100 274.285714v475.428572L512 987.428571l412-237.714285V274.285714l-186.171429-107.428571zM478.514286 890.971429L314.971429 796.571429V637.028571L166.857143 552.914286V353.028571l311.657143 179.771429v358.171429zM199.085714 294.285714l153.942857-88.914285 158.742858 91.085714 158.971428-91.314286 154.514286 89.142857-313.028572 180.571429-313.142857-180.571429zM857.142857 553.485714l-147.2 83.542857v158.971429l-164.457143 94.857143V533.028571L857.142857 353.257143v200.228571z","p-id":"2784",fill:"#666"},null,-1);oe.render=function(e,t,n,o,r,s){return c(),u("svg",re,[se])};const ie=e=>t=>{const n=t.match(e);return n&&n[1].trim()},ae=e=>JSON.parse(decodeURIComponent(e)),le=/<script.*>([\s\S]+)<\/script>/,ce=/<style>([\s\S]+)<\/style>/,ue=/<template>([\s\S]+)<\/template>/,de=["codepen","jsfiddle"],pe={codepen:"https://codepen.io/pen/define",jsfiddle:"https://jsfiddle.net/api/post/library/pure",codesandbox:"https://codesandbox.io/api/v1/sandboxes/define"},he={codepen:"Codepen",jsfiddle:"JSFiddle",codesandbox:"CodeSandbox"};var me={name:"OnlineEdit",components:{codepen:X,jsfiddle:ee,codesandbox:oe},props:{platform:{type:String,required:!0,validator:e=>-1!==de.indexOf(e)},js:{type:String,default:""},css:{type:String,default:""},html:{type:String,default:""},jsPre:{type:String,default:"babel"},layout:{type:String,default:"left"},jsLibs:{type:Array,default:()=>[]},cssLibs:{type:Array,default:()=>[]},editors:{type:String,default:"101"}},computed:{jsTmpl:e=>`new Vue({\n\tel: '#app', \n\t${e.js.replace(/export\s+default\s*?\{\n*/,"").replace(/\n*\}\s*$/,"").trim()}\n})`,htmlTmpl:e=>`<div id="app">\n\n${e.html}\n\n</div>`,actionUrl:e=>pe[e.platform],resources:e=>e.jsLibsWithVue.concat(e.cssLibs).join(","),js_external:e=>e.jsLibsWithVue.join(";"),platformTip:e=>he[e.platform],css_external:e=>e.cssLibs.join(";"),jsLibsWithVue:e=>e.jsLibs.concat("https://unpkg.com/vue@3.0.0-beta.14/dist/vue.global.js"),codepenValue:e=>JSON.stringify({js:e.jsTmpl,css:e.css,html:e.htmlTmpl,layout:e.layout,editors:e.editors,js_external:e.js_external,css_external:e.css_external,js_pre_processor:e.jsPre})}};me.render=function(e,t,n,o,r,s){return c(),u("form",{class:"demo-and-code-online-edit-wrapper",target:"_blank",action:s.actionUrl,method:"post"},[p(" https://blog.codepen.io/documentation/api/prefill/ "),"codepen"===n.platform?(c(),u("input",{key:0,type:"hidden",name:"data",value:s.codepenValue},null,8,["value"])):p("v-if",!0),d("button",{type:"submit","data-tip":s.platformTip},[(c(),u(h(n.platform)))],8,["data-tip"])],8,["action"])};var fe={props:{componentName:String,htmlStr:String,codeStr:String,language:{default:"vue",type:String},platforms:{default:()=>["codepen"],type:Array},jsLibsStr:{type:String,default:"[]"},cssLibsStr:{type:String,default:"[]"},title:{type:String,default:""},desc:{type:String,default:""}},components:{copySvg:R,codeSvg:K,OnlineEdit:me},setup(t){const n=f(()=>decodeURIComponent(t.htmlStr)),o=f(()=>decodeURIComponent(t.codeStr)),{showTip:r,copyCode:s}=function(t){const n=e({showTip:!1});return{...m(n),copyCode:function(){navigator.clipboard.writeText(t),n.showTip=!0,setTimeout(()=>{n.showTip=!1},5e3)}}}(o.value),{expand:i,toggleExpand:a,parsedCode:l}=function(t,n,o){const r=e({expand:!1}),s=f(()=>({js:ie(le)(t)||"",css:ie(ce)(t)||"",html:ie(ue)(t)||t.replace(le,"").replace(ce,"").replace(ue,"").trim(),jsLibs:ae(n),cssLibs:ae(o)}));return{...m(r),toggleExpand:()=>r.expand=!r.expand,parsedCode:s}}(o.value,t.jsLibsStr,t.cssLibsStr);return{expand:i,toggleExpand:a,decodedHtmlStr:n,parsedCode:l,showTip:r,copyCode:s}}};const ve={class:"demo"},ge={class:"demo-slot"},we={class:"demo-title-desc"},ke={class:"demo-title"},be={class:"demo-desc"},ye={class:"demo-actions"},xe={class:"demo-platforms"},Le={class:"demo-buttons"},Se={class:"demo-actions-copy"},Ce={class:"demo-actions-tip"};fe.render=function(e,t,n,o,r,s){const i=v("OnlineEdit"),a=v("copySvg"),l=v("codeSvg");return c(),u("article",ve,[d("div",ge,[g(e.$slots,"default")]),w(d("div",we,[d("span",ke,b(n.title),1),d("span",be,b(n.desc),1)],512),[[k,n.title||n.desc]]),d("div",ye,[d("div",xe,[(c(!0),u(y,null,x(n.platforms,e=>(c(),u(i,L({key:e},o.parsedCode,{platform:e}),null,16,["platform"]))),128))]),d("div",Le,[d("div",Se,[w(d("span",Ce,"复制成功!",512),[[k,o.showTip]]),w(d(a,{onClick:o.copyCode,title:"复制"},null,8,["onClick"]),[[k,!o.showTip]])]),d(l,{class:"demo-actions-expand",onClick:t[1]||(t[1]=e=>o.toggleExpand()),title:"展开"})])]),w(d("div",{innerHTML:o.decodedHtmlStr,class:`language-${n.language} extra-class`},null,10,["innerHTML"]),[[k,o.expand]])])};const Te=S((je='{"lang":"en-US","title":"vhooks","description":"vue3 hooks","base":"/vhooks/","head":[["link",{"href":"/doc"},"文档"]],"themeConfig":{"nav":[{"text":"Home1","link":"/"},{"text":"文档","link":"/src/hooks"}],"sidebar":[{"link":"/dom","text":"Dom","children":[{"link":"/src/hooks/useFullscreen/readme","text":"useFullscreen"},{"link":"/src/hooks/useDocumentVisibility/readme","text":"useDocumentVisibility"},{"link":"/src/hooks/useHover/readme","text":"useHover"},{"link":"/src/hooks/useInViewport/readme","text":"useInViewport"},{"link":"/src/hooks/useSize/readme","text":"useSize"}]},{"link":"/state","text":"State","children":[{"link":"/src/hooks/useUrlState/readme","text":"useUrlState"},{"link":"/src/hooks/useToggle/readme","text":"useToggle"},{"link":"/src/hooks/useLocalState/readme","text":"useLocalState"},{"link":"/src/hooks/useThrottle/readme","text":"useThrottle"}]},{"link":"/woker","text":"worker","children":[{"link":"/src/hooks/useWorkerFunction/readme","text":"useWorkerFunction"}]}],"search":true,"searchMaxSuggestions":10},"locales":{}}',C(JSON.parse(je))));var je;function $e(){return Te}function qe(e,t){const n=function(e,t){t.sort((e,t)=>{const n=t.split("/").length-e.split("/").length;return 0!==n?n:t.length-e.length});for(const n of t)if(e.startsWith(n))return n}(t,Object.keys(e));return n?e[n]:void 0}function Be(e=O()){return f(()=>function(e,t){const n=qe(e.locales||{},t)||{},o=qe(e.themeConfig&&e.themeConfig.locales||{},t)||{};return{...e,...n,themeConfig:{...e.themeConfig,...o,locales:{}},locales:{}}}(Te.value,e.path))}const Ee=/#.*$/,Oe=/\.(md|html)$/,_e=/\/$/,Ae=/^[a-z]+:/i;function Me(e){return($e().value.base+e).replace(/\/+/g,"/")}function ze(e){return Ae.test(e)}function Ie(e){return decodeURI(e).replace(Ee,"").replace(Oe,"")}const De={class:"icon outbound",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15"},Ve=d("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"},null,-1),Ne=d("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"},null,-1);const He={render:function(e,t){return c(),u("svg",De,[Ve,Ne])}},Pe=e=>((e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\.html$/,"")).endsWith("/")&&(e+="index"),e);var Fe=T({components:{OutboundLink:He},props:{item:{type:Object,required:!0}},setup(e){const t=e.item,n=O(),o=f(()=>({active:r.value,external:s.value})),r=f(()=>Pe(Me(t.link))===Pe(n.path)),s=f(()=>ze(t.link)),i=f(()=>s.value?t.link:Me(t.link)),a=f(()=>t.target?t.target:s.value?"_blank":""),l=f(()=>t.rel?t.rel:s.value?"noopener noreferrer":"");return{classes:o,isActiveLink:r,isExternalLink:s,href:i,target:a,rel:l}}});const Re={class:"nav-item"};Fe.render=function(e,t,n,o,r,s){const i=v("OutboundLink");return c(),u("div",Re,[d("a",{class:["nav-link",e.classes],href:e.href,target:e.target,rel:e.rel,"aria-label":e.item.ariaLabel},[j(b(e.item.text)+" ",1),e.isExternalLink?(c(),u(i,{key:0})):p("v-if",!0)],10,["href","target","rel","aria-label"])])};var Ue=T({name:"DropdownLink",components:{NavBarLink:Fe},props:{item:{type:Object,required:!0}},setup(e){const t=S(!1),n=O();$(()=>n.path,()=>{t.value=!1});return{open:t,setOpen:e=>{t.value=e},isLastItemOfArray:(e,t)=>t.length&&t.indexOf(e)===t.length-1}}});const We={class:"nav-dropdown"},Je={key:0},Ke={key:1,class:"dropdown-subitem-wrapper"};Ue.render=function(e,t,n,o,r,s){const i=v("NavBarLink");return c(),u("div",{class:["dropdown-wrapper",{open:e.open}]},[d("button",{class:"dropdown-title",type:"button","aria-label":e.item.ariaLabel,onClick:t[1]||(t[1]=t=>e.setOpen(!e.open))},[d("span",null,b(e.item.text),1),d("span",{class:["arrow",e.open?"down":"right"]},null,2)],8,["aria-label"]),d("ul",We,[(c(!0),u(y,null,x(e.item.items,(t,n)=>(c(),u("li",{key:t.link||n,class:"dropdown-item"},[t.items?(c(),u("h4",Je,b(t.text),1)):p("v-if",!0),t.items?(c(),u("ul",Ke,[(c(!0),u(y,null,x(t.items,n=>(c(),u("li",{key:n.link,class:"dropdown-subitem"},[d(i,{item:n,onFocusout:o=>e.isLastItemOfArray(n,t.items)&&e.isLastItemOfArray(t,e.item.items)&&e.setOpen(!1)},null,8,["item","onFocusout"])]))),128))])):(c(),u(i,{key:2,item:t,onFocusout:n=>e.isLastItemOfArray(t,e.item.items)&&e.setOpen(!1)},null,8,["item","onFocusout"]))]))),128))])],2)};const Ge=["GitHub","GitLab","Bitbucket"].map(e=>[e,new RegExp(e,"i")]);var Ye={components:{NavBarLink:Fe,NavDropdownLink:Ue},setup(){const e=Be(),t=$e(),n=f(()=>{const e=t.value.themeConfig,n=e.docsRepo||e.repo;let o=e.repoLabel;if(n){const e=/^https?:/.test(n)?n:"https://github.com/"+n;if(!o){const t=e.match(/^https?:\/\/[^/]+/);if(t){const e=t[0],n=Ge.find(([t,n])=>n.test(e));o=n&&n[0]}}return{link:e,text:o||"Source"}}return null});return{navData:e.value.themeConfig.nav,repoInfo:n}}};const Xe={key:0,class:"nav-links"};Ye.render=function(e,t,n,o,r,s){const i=v("NavDropdownLink"),a=v("NavBarLink");return e.navData||e.repoInfo?(c(),u("nav",Xe,[e.navData?(c(!0),u(y,{key:0},x(e.navData,e=>(c(),u(y,null,[e.items?(c(),u(i,{key:0,item:e},null,8,["item"])):(c(),u(a,{key:1,item:e},null,8,["item"]))],64))),256)):p("v-if",!0),e.repoInfo?(c(),u(a,{key:1,item:e.repoInfo},null,8,["item"])):p("v-if",!0)])):p("v-if",!0)};var Qe={components:{NavBarLinks:Ye},setup:()=>({withBase:Me})};Qe.render=function(e,t,n,o,r,s){const i=v("NavBarLinks");return c(),u(y,null,[d("a",{class:"title","aria-label":e.$site.title+", back to home",href:e.$site.base},[e.$theme.logo?(c(),u("img",{key:0,class:"logo",src:e.withBase(e.$theme.logo),alt:"logo"},null,8,["src"])):p("v-if",!0),d("span",null,b(e.$site.title),1)],8,["aria-label","href"]),d(i,{class:"hide-mobile"})],64)};var Ze={emits:["toggle"]};const et=d("svg",{class:"icon",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",role:"img",viewBox:"0 0 448 512"},[d("path",{fill:"currentColor",d:"M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z",class:""})],-1);function tt(){let e=null,t=null;const n=decodeURIComponent,o=e=>e&&e.classList.remove("active"),r=n=>{if(o(t),o(e),t=document.querySelector(`.sidebar a[href="${n}"]`),t){t.classList.add("active");const n=t.closest(".sidebar > ul > li");n&&n!==t.parentElement?(e=n.querySelector("a"),e&&e.classList.add("active")):e=null}},l=()=>{const e=[].slice.call(document.querySelectorAll(".sidebar a")),t=[].slice.call(document.querySelectorAll(".header-anchor")).filter(t=>e.some(e=>e.hash===t.hash)),o=document.getElementById("app").offsetTop,s=window.scrollY,i=e=>e.parentElement.offsetTop-o-15;for(let e=0;e<t.length;e++){const o=t[e],a=t[e+1];if(0===e&&0===s||s>=i(o)&&(!a||s<i(a))){const e=n(o.hash);return history.replaceState(null,document.title,e),void r(e)}}},c=function(e,t){let n,o=!1;return()=>{n&&clearTimeout(n),o?n=setTimeout(e,t):(e(),o=!0,setTimeout(()=>{o=!1},t))}}(l,300);s(()=>{l(),window.addEventListener("scroll",c)}),i(()=>{r(n(location.hash))}),a(()=>{window.removeEventListener("scroll",c)})}Ze.render=function(e,t,n,o,r,s){return c(),u("div",{class:"sidebar-button",onClick:t[1]||(t[1]=t=>e.$emit("toggle"))},[et])};const nt=e=>{const{item:{link:t,text:n,children:o}}=e,r=O(),s=$e(),i=(a=s.value.base,(c=t||"")?c.startsWith("#")?c:function(e,t){const n=e.endsWith("/"),o=t.startsWith("/");return n&&o?e.slice(0,-1)+t:n||o?e+t:`${e}/${t}`}(a,c):void 0);var a,c;const u=function(e,t){return void 0!==t&&Ie(e.path)===Ie(t)}(r,i);return l("li",{class:"sidebar-item"},[it(u,n,i),at(u,o)])};var ot={components:{NavBarLinks:Ye,SideBarItem:nt},setup(){const e=z(),t=Be(),n=O();return tt(),{items:f(()=>{const{headers:o,frontmatter:{sidebar:r,sidebarDepth:s=2}}=e.value;if("auto"===r)return rt(o,s);if(Array.isArray(r))return st(r);if(!1===r)return[];{const{sidebar:e}=t.value.themeConfig;if("auto"===e)return rt(o,s);if(Array.isArray(e))return st(e);if(!1===e)return[];if("object"==typeof e)return function(e,t,n,o){const r=[t,Object.keys(e)[0]].map(t=>e[function(e){const t=e.split("/");return t[t.length-1]&&t.pop(),function(e){return/(\.html|\/)$/.test(e)?e:e+"/"}(t.join("/"))}(t)]).find(Boolean);if(Array.isArray(r))return st(r);if("auto"===r)return rt(n,o);return[]}(e,n.path,o,s)}})}}};function rt(e,t){const n=[];if(void 0===e)return[];let o=void 0;return e.forEach(({level:e,title:r,slug:s})=>{if(e-1>t)return;const i={text:r,link:"#"+s};2===e?(o=i,n.push(i)):o&&(o.children||(o.children=[])).push(i)}),n}function st(e,t){return e}function it(e,t,n){return l(n?"a":"p",{class:{"sidebar-link":!0,active:e},href:n},t)}function at(e,t,n){return t&&t.length>0?l("ul",{class:"sidebar-items"},t.map(e=>l(nt,{item:e}))):e&&n?at(!1,function(e){return function e(t){return t.map(t=>({text:t.title,link:"#"+t.slug,children:t.children?e(t.children):void 0}))}(function(e){let t;return(e=e.map(e=>Object.assign({},e))).forEach(e=>{2===e.level?t=e:t&&(t.children||(t.children=[])).push(e)}),e.filter(e=>2===e.level)}(e))}(n)):null}const lt={class:"sidebar"},ct=d("ul",{class:"slug"},null,-1);ot.render=function(e,t,n,o,r,s){const i=v("NavBarLinks"),a=v("SideBarItem");return c(),u(y,null,[d(i,{class:"show-mobile"}),g(e.$slots,"top"),d("ul",lt,[(c(!0),u(y,null,x(e.items,e=>(c(),u(a,{item:e},null,8,["item"]))),256))]),ct,g(e.$slots,"bottom")],64)};var ut={setup(){const e=z(),t=$e(),n=e=>{let n;return Object.keys(t.value.themeConfig.sidebar).some(o=>t.value.themeConfig.sidebar[o].some(t=>(Array.isArray(t.children)&&(n=t.children.find(t=>t.link===e)),!!n))),n},o=f(()=>{if(!1!==e.value.frontmatter.next)return"string"==typeof e.value.frontmatter.next?n(e.value.frontmatter.next):e.value.next}),r=f(()=>{if(!1!==e.value.frontmatter.prev)return"string"==typeof e.value.frontmatter.prev?n(e.value.frontmatter.prev):e.value.prev}),s=f(()=>!!o||!!r);return{next:o,prev:r,hasLinks:s}}};const dt={key:0,class:"links-wrapper"},pt={class:"prev-link"},ht={key:0},mt=j(" ← "),ft={class:"next-link"},vt={key:0},gt=j(" → ");ut.render=function(e,t,n,o,r,s){return e.hasLinks?(c(),u("div",dt,[d("div",pt,[e.prev?(c(),u("div",ht,[mt,d("a",{href:e.prev.link},b(e.prev.text),9,["href"])])):p("v-if",!0)]),d("div",ft,[e.next?(c(),u("div",vt,[d("a",{href:e.next.link},b(e.next.text),9,["href"]),gt])):p("v-if",!0)])])):p("v-if",!0)};var wt={components:{OutboundLink:He},setup(){const e=z(),t=$e();return{editLink:f(()=>{const n=null==e.value.frontmatter.editLink?t.value.themeConfig.editLinks:e.value.frontmatter.editLink,{repo:o,docsDir:r="",docsBranch:s="master",docsRepo:i=o}=t.value.themeConfig,{relativePath:a}=e.value;return n&&a&&o?function(e,t,n,o,r){if(/bitbucket.org/.test(e)){return(ze(t)?t:e).replace(_e,"")+`/src/${o}/`+(n?n.replace(_e,"")+"/":"")+r+`?mode=edit&spa=0&at=${o}&fileviewer=file-view-default`}return(ze(t)?t:"https://github.com/"+t).replace(_e,"")+`/edit/${o}/`+(n?n.replace(_e,"")+"/":"")+r}(o,i||o,r,s,a):null}),editLinkText:f(()=>t.value.themeConfig.editLinkText||"Edit this page")}}};const kt={class:"page-edit"};wt.render=function(e,t,n,o,r,s){const i=v("OutboundLink");return c(),u("footer",kt,[e.editLink?(c(),u("a",{key:0,href:e.editLink,target:"_blank",rel:"noopener noreferrer"},[j(b(e.editLinkText)+" ",1),d(i)],8,["href"])):p("v-if",!0)])};var bt={components:{NextAndPrevLinks:ut,PageEdit:wt}};const yt={class:"content"};bt.render=function(e,t,n,o,r,s){const i=v("Content"),a=v("NextAndPrevLinks"),l=v("PageEdit");return c(),u("div",yt,[g(e.$slots,"top"),d(i),d(a),d(l),g(e.$slots,"bottom")])};var xt={components:{NavBar:Qe,ToggleSideBarButton:Ze,SideBar:ot,Page:bt},setup(){const e=S(!1);return{open:e,toggleSidebar:t=>{e.value="boolean"==typeof t?t:!e.value}}}};const Lt={class:"theme"};xt.render=function(e,t,n,o,r,s){const i=v("NavBar"),a=v("ToggleSideBarButton"),l=v("SideBar"),p=v("Page"),h=v("Debug");return c(),u(y,null,[d("div",Lt,[d("header",null,[d(i),d(a,{onToggle:o.toggleSidebar},null,8,["onToggle"])]),d("aside",{class:{open:o.open}},[d(l,null,{top:q(()=>[g(e.$slots,"sidebar-top")]),bottom:q(()=>[g(e.$slots,"sidebar-bottom")]),_:1})],2),d("div",{class:["sidebar-mask",{"sidebar-open":o.open}],onClick:t[1]||(t[1]=e=>o.toggleSidebar(!1))},null,2),d("main",null,[d(p,null,{top:q(()=>[g(e.$slots,"page-top")]),bottom:q(()=>[g(e.$slots,"page-bottom")]),_:1})])]),d(h)],64)};const St=["There's nothing here.","How did we get here?","That's a Four-Oh-Four.","Looks like we've got some broken links."];var Ct={setup:()=>({getMsg:()=>St[Math.floor(Math.random()*St.length)]})};const Tt={class:"theme"},jt=d("h1",null,"404",-1);Ct.render=function(e,t,n,o,r,s){return c(),u("div",Tt,[jt,d("blockquote",null,b(e.getMsg()),1),d("a",{href:e.$site.base,"aria-label":"go to home"}," Take me home. ",8,["href"])])};const $t={Layout:xt,NotFound:Ct},qt=$t.NotFound||(()=>"404 Not Found");function Bt(){const o=S();let r,s=I;const i=function(o,r){const s=e({path:"/",contentComponent:null}),i="undefined"!=typeof window;function a(e){e=e||(i?location.href:"/");const t=new URL(e,"http://a.com");return t.pathname.endsWith("/")||t.pathname.endsWith(".html")||(t.pathname+=".html",e=t.href),i&&(history.replaceState({scrollPosition:window.scrollY},document.title),history.pushState(null,"",e)),l(e)}async function l(e,a=0){const l=new URL(e,"http://a.com"),c=s.path=l.pathname;try{let e=o(s);if("then"in e&&"function"==typeof e.then&&(e=await e),s.path===c){if(!e)throw new Error("Invalid route component: "+e);s.contentComponent=t(e),i&&n(()=>{if(l.hash&&!a){const e=document.querySelector(decodeURIComponent(l.hash));if(e)return void _(e,l.hash)}window.scrollTo(0,a)})}}catch(e){e.message.match(/fetch/)||console.error(e),s.path===c&&(s.contentComponent=r?t(r):null)}}return i&&(window.addEventListener("click",e=>{const t=e.target.closest("a");if(t){const{href:n,protocol:o,hostname:r,pathname:s,hash:i,target:l}=t,c=window.location;e.ctrlKey||e.shiftKey||e.altKey||e.metaKey||"_blank"===l||o!==c.protocol||r!==c.hostname||(e.preventDefault(),s===c.pathname?i&&i!==c.hash&&(history.pushState(null,"",i),_(t,i,t.classList.contains("header-anchor"))):a(n))}},{capture:!0}),window.addEventListener("popstate",e=>{l(location.href,e.state&&e.state.scrollPosition||0)}),window.addEventListener("hashchange",e=>{e.preventDefault()})),{route:s,go:a}}(e=>{let t=D(e.path);if(s&&(r=t),(s||r===t)&&(t=t.replace(/\.js$/,".lean.js")),I)return s=!1,import(t).then(e=>(e.__pageData&&(o.value=C(JSON.parse(e.__pageData))),e.default));{const e=require(t);return o.value=JSON.parse(e.__pageData),e.default}},qt),a=B($t.Layout);a.provide(E,i),a.provide(M,o),a.component("Content",F),a.component("Debug",()=>null),a.component("Demo",fe);const l=Be(i.route);return I&&A(o,l),Object.defineProperties(a.config.globalProperties,{$site:{get:()=>Te.value},$siteByRoute:{get:()=>l.value},$page:{get:()=>o.value},$theme:{get:()=>l.value.themeConfig}}),$t.enhanceApp&&$t.enhanceApp({app:a,router:i,siteData:l}),{app:a,router:i}}if(I){const{app:e,router:t}=Bt();t.go().then(()=>{e.mount("#app")})}export{Bt as createApp};
