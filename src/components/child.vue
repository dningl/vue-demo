<template>
  <h2>组件通信</h2>
  <div @click="sendFun">
    {{parentMsg}}
    {{pMsg}}
  </div>
</template>

<script setup>
import { toRef,defineProps,defineEmits,inject } from "vue";
// export default{ 
//     // 组合式Api写法
//     emits:['sendMsg'],
//     props: ["msg"],// 如果这行不写，下面就接收不到
//     setup(props,context) {
//         console.log('propsprops',props) //父组件信息
//         let parentMsg = toRef(props, 'msg') //在组合式API中，如果想在子组件中用其它变量接收props的值时需要使用toRef将props中的属性转为响应式

//          const sendFun = () => {
//             context.emit('sendMsg', '我是子组件数据')
//         }
//         return {
//             parentMsg,
//             sendFun
//         };
//     },
//   }


    //setup语法糖写法
    const props = defineProps(["msg"]);
    console.log(props.msg) //父组件信息
    let parentMsg = toRef(props, 'msg')

    const emits = defineEmits(['sendMsg'])
    const sendFun = () => {
        emits('sendMsg', '我是子组件数据')
    }

    console.log(inject('msg1').value) //子组件msg1
    console.log(inject('msg2').value) //子组件msg2
    console.log('99999999',inject('msg3')()) //子组件msg3
    let  pMsg = inject('msg1').value
    pMsg = '改变传值'
    console.log('改变传值',pMsg);

</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
