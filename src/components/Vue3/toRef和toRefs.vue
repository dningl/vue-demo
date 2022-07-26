<template>
	<h4>{{person}}</h4>
	<h4>姓名：{{name}}</h4>
	<h4>年龄：{{age}}</h4>
	<h4>办公地址：{{job.j1.salary}}</h4>
	<button @click="name+='~'">修改姓名</button>
	<button @click="age++">增长年龄</button>
	<button @click="job.j1.add+='~'">修改地址</button>
</template>

<script>
	import {ref,reactive,toRef,toRefs, defineComponent} from 'vue'
	export default defineComponent({
		name: 'Demo',
		setup(){
			let person = reactive({
				name:'张三',
				age:18,
				job:{
					j1:{
						add:'雨花台区'
					}
				}
			})

			// const name1 = person.name
			// console.log('%%%',name1)

			// const name2 = toRef(person,'name')
			// console.log('####',name2)

			// const x = toRefs(person)
			// console.log('******',x)

			return {
				person,
				// name:toRef(person,'name'),
				// age:toRef(person,'age'),
				// salary:toRef(person.job.j1,'salary'),
				...toRefs(person)
			}
		}
	})
</script>

