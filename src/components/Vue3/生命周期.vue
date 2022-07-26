<template>
    <h2>生命周期</h2>
	<h4>当前求和为：{{sum}}</h4>
	<button @click="sum++">更新数据</button>
</template>

<script>
	import {ref,onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted} from 'vue'
	export default {
		name: '',
		setup(){
			console.log('---setup---')
			let sum = ref(0)
			//通过组合式API的形式去使用生命周期钩子 vue3的形式
			onBeforeMount(()=>{
				console.log('Vue3中的---onBeforeMount---')
			})
			onMounted(()=>{
				console.log('Vue3中的---onMounted---')
			})
			onBeforeUpdate(()=>{
				console.log('Vue3中的---onBeforeUpdate---')
			})
			onUpdated(()=>{
				console.log('Vue3中的---onUpdated---')
			})
			onBeforeUnmount(()=>{
				console.log('Vue3中的---onBeforeUnmount---')
			})
			onUnmounted(()=>{
				console.log('Vue3中的---onUnmounted---')
			})

			//返回一个对象（常用）
			return {sum}
		},

		//通过配置项的形式使用生命周期钩子 Vue2的方式
		//#region 
		beforeCreate() {
			console.log('Vue2---beforeCreate---')
		},
		created() {
			console.log('Vue2中的---created---')
		},
		beforeMount() {
			console.log('Vue2中的---beforeMount---')
		},
		mounted() {
			console.log('Vue2中的---mounted---')
		},
		beforeUpdate(){
			console.log('Vue2中的---beforeUpdate---')
		},
		updated() {
			console.log('Vue2中的---updated---')
		},
		beforeUnmount() {
			console.log('Vue2中的---beforeUnmount---')
		},
		unmounted() {
			console.log('Vue2中的---unmounted---')
		},
		//#endregion
	}
</script>

