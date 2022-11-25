<template>
  <div>
    <img src="https://echarts.apache.org/zh/images/logo.png?_v_=20200710_1" alt="" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import dat from "dat.gui";
onMounted(() => {
  initCharts();
});
const initCharts = () => {
  // 创建一个场景
  const scene = new THREE.Scene();

  // 创建一个相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  //设置相机位置
  camera.position.z = 100;
  scene.add(camera);

  for (let i = 0; i < 50; i++) {
    const geometry = new THREE.BufferGeometry(10, 10, 10);
    const positionArray = new Float32Array(9);
    for (let j = 0; j < 9; j++) {
      positionArray[j] = Math.random() * 5;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3));
    //创建几何体
    // const geometry = new THREE.BoxGeometry( 20, 20, 20 );
    let color = new THREE.Color(Math.random(), Math.random(), Math.random());
    var material = new THREE.MeshBasicMaterial({
      color: 'color',
      // wireframe: true,
      wireframeLinewidth: 1,
    });
    //根据几何体和材质创建一个物体
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  }

  //添加物体

  //将几何体添加到场景中

  // const gui = new dat.GUI();
  // gui.add(cube.position, 'x', 0, 20).name('移动x');

  // const params = {color: 0x00ff7c};
  // gui.addColor(params, 'color').name('颜色').onChange((value) =>{
  //     cube.material.color.set(value);
  // });
  // var folder = gui.addFolder('添加设置');
  // folder.add(cube.position, 'y', 0, 20).name('移动y');
  // folder.add(cube,'visible').name('是否显示');

  //初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  //设置渲染器的大小
  renderer.setSize(window.innerWidth, window.innerHeight);

  //将渲染器添加到页面中
  document.body.appendChild(renderer.domElement);

  //使用渲染器、相机渲染场景
  renderer.render(scene, camera);

  //创建坐标轴
  const axes = new THREE.AxesHelper(40);
  scene.add(axes);

  //设置时钟
  const clock = new THREE.Clock();

  //设置动画
  // var animation = gsap.to(cube.rotation,
  //     {
  //         x: Math.PI * 2,
  //         duration: 5,
  //         ease: 'linear',
  //         //重复次数 -1 为无限重复
  //         repeat: -1,
  //         //往返运动
  //         yoyo: true,
  //         onComplete: function() {
  //     console.log('动画完成');
  //     }
  // });
  // window.addEventListener('click',()=>{
  //     if(animation.isActive()) {
  //         animation.pause();
  //     }else{
  //         animation.resume();
  //     }
  // })

  //创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);

  //设置控制器阻力
  controls.enableDamping = true;
  function render() {
    controls.update();
    // cube.rotation.x += 0.01;
    // if(cube.rotation.x > 5) {
    //     cube.rotation.x = 0;
    // }
    //获取运行时间
    const time = clock.getElapsedTime();
    // console.log(time,'运行总时长');
    //获取间隔时间
    const delta = clock.getDelta();
    // console.log(delta,'间隔时间');

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
  window.addEventListener("dblclick", () => {
    const fullscreen = document.fullscreenElement;
    if (!fullscreen) {
      renderer.domElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
  render();
  window.addEventListener("resize", () => {
    //更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    //更新摄像机投影矩阵
    camera.updateProjectionMatrix();
    //更新渲染器的大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  });
};
</script>

<style scoped></style>
