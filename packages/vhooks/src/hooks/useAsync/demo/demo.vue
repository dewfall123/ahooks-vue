<template>
  <div>{{loading}}</div>
  <!-- <button @click="reset">reset</button> -->
</template>
<script>
import {ref} from 'vue'
import useAsync from '../index.vue'
export default {
setup(){
    function getUserName(){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve('lwp')
                // reject('请求错误')
            },1000)
        })
    }
    function reset(){
      getUserName();
    }
    const {loading,data,error}=useAsync(getUserName);
    if(error.value){
        console.log('err')
    }else{
        console.log('right')
    }
    return {
        loading,getUserName,data,error
    }
}
}
</script>

<style>

</style>