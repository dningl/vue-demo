<!-- eslint-disable no-unused-vars -->
<template>
  <h2>选项式Api和组合式Api</h2>
  <div class="vue3" @click="changeMsg2">选项式Api：{{ name }}</div>
  <div class="vue3" @click="changeMsg3">组合式Api：{{ msg }}</div>
  <br>
</template>

<script>
import {ref} from 'vue'
export default {
  name:'',
  data(){
    return {
      name:'hello vue2'
    }
  },
  methods: {
    changeMsg2(){
      this.name ='hello vue2！！！'
      console.log(this.msg); // hello vue3 (vue2的配置中可以访问到setup中的属性、方法...)
    },
  },
  setup() {
    // setup里的this是undefined
    console.log('setup里的this',this); //undefined

    const msg = ref('hello vue3')
    function changeMsg3() {
        msg.value = 'hello vue3！！！'
      }

    return {
      msg,
      changeMsg3
    }
  },
}
</script>
<style>
.vue3{
  text-align: center;
  color: #2c3e50;
}
</style>
