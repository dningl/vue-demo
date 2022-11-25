// 选项式Api
<template>
  <div class="content">
    <img
      class="ec"
      src="https://echarts.apache.org/zh/images/logo.png?_v_=20200710_1"
      alt=""
    />
    <div class="map-content">
      <div @click="goto('/echarts')">3D地图</div>
      <div @click="goto('/scatter')">3D散点图</div>
      <div @click="goto('/bar')">3D柱状图</div>
      <div @click="goto('/line')">3D飞线图</div>
    </div>
    <img src="../assets/logo.png" alt="" class="vue" />
    <!-- 选项式Api和组合式Api -->
    <Demo1 />
    <br />
    <!-- ref和reactive -->
    <Demo2 />
    <br />
    <!-- Demo3 -->
    <Demo3 />
    <br />
    <!-- Demo4 -->
    <Demo4 />
    <br />
    <!-- 生命周期 -->
    <Lifecycle />
    <br />
    <!-- 组件通信 -->
    <Child @sendMsg="sendMsg" msg="你好，子组件"></Child>
    <br />
    <Ref />
  </div>
</template>

<script setup>
import { ref, provide } from "vue";
import { useRouter } from "vue-router";

import Child from "../components/child.vue";
import Demo1 from "../components/Vue3/选项式Api和组合式Api.vue";
import Demo2 from "../components/Vue3/ref和reactive.vue";
import Demo3 from "../components/Vue3/computed.vue";
import Demo4 from "../components/Vue3/watch.vue";
import Lifecycle from "../components/Vue3/生命周期.vue";
import Ref from "../components/Vue3/toRef和toRefs.vue";
// export default {
// name: 'App',
// components: {
//   Demo1,
//   Demo2,
//   Demo3,
//   Demo4,
//   Lifecycle,
//   Child,
// },
const sendMsg = (val) => {
  console.log(val); //我是子组件数据
};
const msg1 = ref("子组件msg1");
const msg2 = ref("子组件msg2");
const msg3 = () => {
  console.log(55555);
};
provide("msg1", msg1);
provide("msg2", msg2);
provide("msg3", msg3);
// }
const router = useRouter();
const goto = (path) => {
  router.push({
    path: path,
  });
};
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  .ec {
    width: 239px;
    height: 52px;
    margin-top: 10px;
  }
  .vue {
    margin-top: 30px;
  }
  .map-content {
    div {
      margin: 10px 0;
      font-size: 16px;
      cursor: pointer;
      font-weight: 500;
      color: #9f2648;
    }
  }
}
</style>
