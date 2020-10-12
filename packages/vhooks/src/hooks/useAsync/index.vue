<script>
import { ref,reactive } from "vue";
export  default function useAsync(server,options={}) {
  const loading = ref(false);
  const error=ref(undefined);
  const data=ref(undefined);
  const {manual=false,onSuccess}=options;
  const immediate=!manual;
// function run(){

// }
immediate&&run()
function run(args){
  loading.value = true;
    server().then((res) => {
    loading.value = false;
    data.value=res;
    onSuccess(res,args)
  }).catch(err=>{
    error.value=err
  });
}
  
  return {
    loading,error,data,run
  };
}
</script>