<!-- eslint-disable no-unused-vars -->
<template>
  <h2>ref和reactive</h2>
  <div class="vue3" @click="changeRef">ref定义的变量：{{ msg }}</div>
  <div class="vue3" @click="changeReactive">reactive定义的变量：{{ news.name }}</div>
  <br>
</template>

<script>
import {ref,reactive} from 'vue'
export default {
  name:'',
  beforeCreate(){
    console.log('beforeCreate',this); //undefined
  },
  setup() {
    //ref
    const msg = ref('hello vue3')
    const job = ref({
        level:'1',
        salary:'1000'
    })
    function changeRef() {
        msg.value = 'hello vue3！！！'
        job.value.level = '2'
        console.log(job); // ref的内部也借助了proxy来实现了响应式
    }

    //reactive
    const news = reactive({
        name:'hello vue3',
        a:{
            b:{
                c:1111
            }
        }
    })
    function changeReactive() {
        news.name = 'hello vue3！！！'
        news.a.b.c = 2222
    }
    return {
      msg,
      news,
      changeRef,
      changeReactive
    }
  },
}
</script>
<style>
.vue3 {
  text-align: center;
  color: #2c3e50;
}
</style>
