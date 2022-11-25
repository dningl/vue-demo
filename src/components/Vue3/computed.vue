<template>
  <h2>computed函数</h2>
  <div>三秒后值会改变：{{ newName }}</div>
  <br />
</template>

<script>
import { ref, computed } from "vue";
export default {
  name: "",
  setup() {
    const name = ref(0);
    // const newName = computed(() => {
    //     return name.value + '!!!'
    // })

    /*当去修改 newName 值的时候会触发 set 方法的执行，newName 并不可直接被修改，
            赋给 newName 的值会作为参数传递到 set 方法中 */
    const newName = computed({
      get: () => {
        // 3. 当 name 的值被修改后，触发 get 方法
        console.log("get----", name.value);
        return name.value + 10; // 95 + 10 = 105，所以newName 的值是 105
      },
      set: (param) => {
        // 2. 下方定时器中赋值的 100 ,会作为参数传递到 set 方法 ，
        console.log("set----", param);
        name.value = param - 5; //   name.value 被修改 100 - 5 = 95 ，所以 name 的值是95
        console.log("set----", name.value);
      },
    });

    setTimeout(() => {
      newName.value = 100;
    }, 3000); // 1. 三秒后给 newName 赋值

    return { newName }; // 所有代码执行完毕之后 newName 的值是 105
  },
};
</script>
<style>
h2 {
    color: #37ad70;
  }
</style>