import"./axios.b3cfc440.js";import{s as t,g as e}from"./lifeCircle.19a7b292.js";import{u as n}from"./index.955b573c.js";import{H as i,u as o,o as r,c as s,b as c,p as u,D as d}from"./framework.8cd85e4b.js";function a(o){const{state:r}=n(!1);return t((()=>{const t=e(o);if(!t)return;const n=function(t){if(!t)return!1;const e=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,n=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,i=t.getBoundingClientRect();if(i){const{top:t,bottom:o,left:r,right:s}=i;return o>0&&t<=n&&r<=e&&s>0}return!1}(t);r.value=n;const s=new IntersectionObserver((t=>{const e=t.every((t=>t.isIntersecting));r.value=e}));s.observe(t),i((()=>{s.disconnect()}))})),r}var l={setup(){const t=o(null);return{divRef:t,isInViewport:a(t)}}};const m={ref:"divRef",style:{width:"100px",height:"100px",background:"rgba(0, 0, 0, 0.1)","margin-bottom":"300px"}},f=d(" isInViewport: "),p={style:{color:"blue"}};l.render=function(t,e,n,i,o,d){return r(),s("div",null,[c("div",m,null,512),f,c("span",p,u(i.isInViewport),1)])};export{l as _};
