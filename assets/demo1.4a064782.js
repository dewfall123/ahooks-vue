import{b as e,w as n,o as t,e as r,v as o,N as a,f as i,r as l}from"./framework.f47b9a5e.js";import"./types.6ff06541.js";function s(t,r){const o=e(function(){const e=localStorage.getItem(t);if(e)try{return JSON.parse(e)}catch{}if("function"==typeof r)return r();return r}());return n(o,(()=>{localStorage.setItem(t,JSON.stringify(o.value))}),{deep:!0,immediate:!1}),o}var u={setup:()=>({form:s("user-form",{name:"dendi",age:18})})};u.render=function(e,n,l,s,u,f){return t(),r("div",null,[o(i("input",{"onUpdate:modelValue":n[1]||(n[1]=e=>s.form.name=e),style:{"margin-right":"16px"}},null,512),[[a,s.form.name]]),o(i("input",{"onUpdate:modelValue":n[2]||(n[2]=e=>s.form.age=e)},null,512),[[a,s.form.age]])])};var f={setup:()=>({conditions:l({field1:s("field1","hello world!")})})};f.render=function(e,n,l,s,u,f){return t(),r("div",null,[o(i("input",{"onUpdate:modelValue":n[1]||(n[1]=e=>s.conditions.field1=e)},null,512),[[a,s.conditions.field1]])])};export{u as a,f as s};
