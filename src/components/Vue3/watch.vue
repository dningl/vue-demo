<template>
    <h2>watch函数</h2>
	<h4>当前求和为：{{sum}}</h4>
	<button @click="sum++">点我+1</button>
	<h4>当前的信息为：{{msg}}</h4>
	<button @click="msg+='！'">修改信息</button>
	<h4>姓名：{{person.name}}</h4>
	<h4>年龄：{{person.age}}</h4>
	<h4>办公地址：{{person.job.j1.add}}</h4>
	<button @click="person.name+='~'">修改姓名</button>
	<button @click="person.age++">增长年龄</button>
	<button @click="person.job.j1.add+='~'">修改地址</button>
    <br>
</template>

<script >
	import {ref,reactive,watch,watchEffect} from 'vue'
	export default {
		name: '',
		setup(){
			let sum = ref(0)
			let msg = ref('你好啊')
			let person = reactive({
				name:'张三',
				age:18,
				job:{
					j1:{
						add:'雨花台区'
					}
				}
			})

			//情况一：监视ref所定义的一个响应式数据 这里需要监听整个RefImpl对象才能起作用，所以说在写watch时不需要加.value
			// watch(sum,(newValue,oldValue)=>{
			// 	console.log('sum变了',newValue,oldValue)
			// },{immediate:true})

			// //情况二：监视ref所定义的多个响应式数据 ，newValue,oldValue都是数组
			// watch([sum,msg],(newValue,oldValue)=>{
			// 	console.log('sum或msg变了',newValue,oldValue)
			// },{immediate:true})

			/* 
				情况三：监视reactive所定义的一个响应式数据的全部属性
						1.注意：此处无法正确的获取oldValue
						2.注意：强制开启了深度监视（deep配置无效）
			*/
			// watch(person,(newValue,oldValue)=>{
			// 	console.log('person变化了',newValue,oldValue)
			// },{deep:false}) //此处的deep配置无效
            // // watch(
            // // // // 这只是浅拷贝，解决第一层问题
            // // () => ({ ...person }),
            // // (newVal, oldVal) => {
            // //     console.log(newVal, oldVal); // { name: '张三', age: 18, job: { j1: { salary: 20 } } } { name: '李四', age: 18, job: { j1: { salary: 20 } } }
            // // },
            // // );

			// //情况四：监视reactive所定义的一个响应式数据中的某个属性
			// watch(()=>person.name,(newValue,oldValue)=>{
			// 	console.log('person的name变化了',newValue,oldValue)
			// }) 

			// //情况五：监视reactive所定义的一个响应式数据中的某些属性
			// watch([()=>person.name,()=>person.age],(newValue,oldValue)=>{
			// 	console.log('person的name或age变化了',newValue,oldValue)
			// }) 

			// //特殊情况
			// watch(()=>person.job,(newValue,oldValue)=>{
			// 	console.log('特殊情况person的job变化了',newValue,oldValue)
			// },{deep:true}) //此处由于监视的是reactive定义的对象中的某个属性，所以deep配置有效


            watchEffect(()=>{
				const x1 = sum.value
				const x2 = person.job.j1.add
				console.log(x1,x2,'watchEffect所指定的回调执行了')
			})

			return {
				sum,
				msg,
				person
			}
		}
	}
</script>

