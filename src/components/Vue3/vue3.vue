<!-- eslint-disable no-unused-vars -->
<template>
  <br>
  <input type="text" v-model="bbb">
  <br>
  <br>
  <input type="text" v-model="msg.name">
</template>

<script>
import {computed, reactive, ref,watch, watchEffect} from 'vue'
export default {
  name:'',
  setup() {
    console.log(this); //undefined

    //ref 
    // const msg = ref('hello vue3')
    // const job = ref({
    //   level:'1',
    //   salary:'1000'
    // })
    // job.value.level = '2'
    // console.log(job); // ref的内部也借助了proxy来实现了响应式
    // const changeMsg3 = () => {
    //   msg.value = 'hello vue3！！！'
    //   // console.log(this.name)  //undefined (setup中不能访问到vue2里中的配置（data,methods…)
    //   console.log(msg) // hello vue3!
    // }


    // reactive
    const msg = reactive({
      name:'hello vue3',
      a:{
        b:{
          c:1111
        }
      }
    })
     const changeMsg3 = () => {
      msg.name = 'hello vue3！！！'
      msg.a.b.c = 2222
    }

    //computed
    const bbb = computed(() => {
      return msg.a.b.c + msg.name
      //如果需要修改计算属性的值
      // get(){},
      // set(){}
    })

    //watch
     //情况一：监视ref定义的响应式数据
      // watch(msg,(newValue,oldValue)=>{
      //   console.log('sum变化了',newValue,oldValue)
      // },{immediate:true})

      //情况二：监视多个ref定义的响应式数据
      // watch([sum,msg],(newValue,oldValue)=>{
      // 	console.log('sum或msg变化了',newValue,oldValue)
      // }) 

      /* 情况三：监视reactive定义的响应式数据
			若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue,且强制开启了深度监视 
      */
      // watch(person,(newValue,oldValue)=>{
      // 	console.log('person变化了',newValue,oldValue)
      // },{immediate:true,deep:false}) //此处的deep配置不再奏效

      //情况四：监视reactive定义的响应式数据中的某个属性
      // watch(()=>person.job,(newValue,oldValue)=>{
      // 	console.log('person的job变化了',newValue,oldValue)
      // },{immediate:true,deep:true}) 

      //情况五：监视reactive定义的响应式数据中的某些属性
      // watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
      // 	console.log('person的job变化了',newValue,oldValue)
      // },{immediate:true,deep:true})

      //特殊情况
      // watch(()=>person.job,(newValue,oldValue)=>{
      //     console.log('person的job变化了',newValue,oldValue)
      // },{deep:true}) //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
      

      //函数里用到什么属性就监听什么属性，类似于computed，但是和computed不同的是，watchEffect不需要return一个值，而是直接改变响应式数据
      watchEffect(()=>{
        console.log('person的job变化了',msg.a.b.c)
      })
    return {
      msg,
      bbb,
      changeMsg3
    }
  },
}
</script>
<style>
.vue2,.vue2 {
  text-align: center;
  color: #2c3e50;
}
</style>
