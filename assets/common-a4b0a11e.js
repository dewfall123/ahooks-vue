import{o as e,c as n,e as s,f as o,s as t,A as r,d as i,y as a}from"./common-34d19493.js";import"./common-ce15c7a5.js";import{u}from"./common-e8db840e.js";import{g as v}from"./common-bb12e71c.js";function c(s,o){const{state:t,setFalse:r,setTrue:i}=u(!1),{onEnter:a,onLeave:c}=o??{};function d(){i(),a&&a()}function m(){r&&r(),c&&c()}return e((()=>{const e=v(s);e&&(e.addEventListener("mouseenter",d),e.addEventListener("mouseleave",m))})),n((()=>{const e=v(s);e&&(e.removeEventListener("mouseenter",d),e.removeEventListener("mouseleave",m))})),t}var d={setup:()=>({isHovering:c((()=>document.getElementById("divRef")))})};const m=o("div",{id:"divRef",style:{width:"200px",height:"200px",background:"rgba(0, 0, 0, 0.2)"}},null,-1),l=r(" isHovering: "),f={style:{color:"blue"}};d.render=function(e,n,r,a,u,v){return i(),s("div",null,[m,l,o("span",f,t(a.isHovering),1)])};var g={setup(){const e=a(null);return{isHovering:c(e),divRef:e}}};const p={ref:"divRef",style:{width:"200px",height:"200px",background:"rgba(0, 0, 0, 0.2)"}},b=r(" isHovering: "),h={style:{color:"blue"}};g.render=function(e,n,r,a,u,v){return i(),s("div",null,[o("div",p,null,512),b,o("span",h,t(a.isHovering),1)])};export{d as a,g as s};