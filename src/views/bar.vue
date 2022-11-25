<template>
  <div class="charts-content">
    <h2>Echarts3D柱状图</h2>
    <!-- <img src="https://echarts.apache.org/zh/images/logo.png?_v_=20200710_1" alt="" /> -->
    <div ref="3dMap" id="3dMap" style="width: 100%; height: 100vh"></div>
  </div>
</template>

<script setup>
import { onMounted,reactive } from "vue";
import * as echarts from "echarts";
import chinaJson from "../assets/js/china.json";
import "echarts-gl";
onMounted(() => {
  initCharts();
});
// geo3d + map3d公用图表配置
const setting = reactive({
  top: "-20%",
  right: "10%",
  bottom: "-20%",
  distance: 120,
  alpha: 40,
  beta: 5,
  regionHeight: 3,
  lineWidth:1
});
// 地图上显示的数据
const mapData = reactive({
  geoCoordMap: {
    江苏省: [119.486506, 30.983991],
    西藏: [88.388277, 31.56375],
    辽宁省: [122.604994, 41.299712],
  },
  dataList: [
    {
      name: "江苏省",
      value: 100,
      num: "aaa",
    },
    {
      name: "西藏",
      value: 120,
      num: "bbb",
    },
    {
      name: "辽宁省",
      value: 190,
      num: "ccc",
    },
  ],
});

// 转化已有数据到地图上显示的配置数据
function convertData(data) {
  const res = [];
  for (let i = 0; i < data.length; i++) {
    const geoCoord = mapData.geoCoordMap[data[i].name];
    if (geoCoord) {
      console.log(geoCoord.concat(data[i].value));
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value),
        num: data[i].num,
        label: {
          show: true,
          position: "top",
          distance: 0, //文字与symbol之间的距离
          formatter(param) {
            return `{sty1|${param.data.num}}`;
          },
          rich: {
            sty1: {
              padding: [10, 20, 10, 20],
              backgroundColor: "rgba(7, 28, 38, 0.7)",
              borderWidth: 0,
              borderColor: "#FF771A",
              borderRadius: 2,
              fontSize: 12,
            },
          },
          textStyle: {
            color: "#ffffff",
          },
        },
      });
    }
  }
  return res;
}
// 获取图表配置
function getOptions() {
  const options = {
    tooltip: {
      show: false,
      trigger: "item",
    },
    textStyle: {
      color: "#ffffff", // 高亮时标签颜色变为 白色
      fontSize: 6, // 高亮时标签字体 变大
    },
    geo3D: {
      show: true,
      map: "map",
      boxHeight: 10,
      top: setting.top,
      right: setting.right,
      left: "0%",
      bottom: setting.bottom,
      regionHeight: setting.regionHeight, // 三维高度 就是模型的高度
      shading: "realistic",
      realisticMaterial: {
        detailTexture: "", // 纹理贴图 shading为 "realistic"时生效
        textureTiling: 1, // 纹理平铺，1是拉伸，数字表示纹理平铺次数
      },
      label: {
        // 标签的相关设置
        show: true, // 地图上是否显示每个的城市名称
        distance: 20,
        formatter(param) {
          const city = param.name.substr(0, 2);
          return `{sty1|${city}}`;
        },
        rich: {
          sty1: {
            color: "#ffffff",
            fontSize: 12,
            align: "center",
          },
        },
        textStyle: {
          // 标签的字体样式
          color: "#ffffff", // 地图初始化区域字体颜色
          opacity: 1, // 字体透明度
        },
      },
      itemStyle: {
        // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
        color: "#2C3C41", // 地图板块的颜色
        opacity: 1, // 图形的不透明度 [ default: 1 ]
        borderWidth: 1, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域 [ default: 0 ]
        borderColor: "#7FB6FD", // 图形描边的颜色。[ default: #333 ]
      },
      emphasis: {
        // 鼠标 hover 高亮时图形和标签的样式 (当鼠标放上去时 label和itemStyle 的样式)
        label: {
          // label高亮时的配置
          show: true,
          textStyle: {
            color: "#fff", // 高亮时标签颜色变为 白色
            fontSize: 13, // 高亮时标签字体 变大
          },
        },
      },
      light: {
        // 光照相关的设置。在 shading 为 'color' 的时候无效。
        // 光照的设置会影响到组件以及组件所在坐标系上的所有图表。合理的光照设置能够让整个场景的明暗变得更丰富，更有层次。
        main: {
          // 场景主光源的设置，在 globe 组件中就是太阳光。
          color: "#ffffff", // 主光源的颜色。[ default: #fff ]
          intensity: 1.2, // 主光源的强度。[ default: 1 ]
          shadow: true, // 主光源是否投射阴影。默认关闭。 开启阴影可以给场景带来更真实和有层次的光照效果。但是同时也会增加程序的运行开销。
          alpha: 145, // 主光源绕 x 轴，即上下旋转的角度。配合 beta 控制光源的方向。[ default: 40 ]
          beta: 30, // 主光源绕 y 轴，即左右旋转的角度。[ default: 40 ]
        },
        ambient: {
          // 全局的环境光设置。
          color: "#fff", // 环境光的颜色。[ default: #fff ]
          intensity: 0.4, // 环境光的强度。[ default: 0.2 ]
        },
      },
      viewControl: {
        autoRotate: false, //是否开启视角绕物体的自动旋转查看
        autoRotateDirection: "cw", //物体自转的方向。默认是 'cw' 也就是从上往下看是顺时针方向，也可以取 'ccw'，既从上往下看为逆时针方向
        autoRotateSpeed: 5, //物体旋转的速度
        autoRotateAfterStill: 3, //在鼠标静止操作后恢复自动旋转的时间间隔
        minBeta: -9999, //最小（左）旋转度数
        maxBeta: 9999, //最多（右）旋转角度
        projection: "perspective",
        distance: setting.distance,
        beta: setting.beta,
        alpha: setting.alpha, //视角绕 x 轴，即上下旋转的角度。配合 beta 可以控制视角的方向
      },
    },
    series: [
      {
        name: 'bar3D',
        type: 'bar3D',
        coordinateSystem: 'geo3D',
        barSize: 1, //柱子粗细
        shading: 'lambert',
        opacity: 1,
        bevelSize:0.3,
        label: {
        show: false,
        },
        emphasis: {
        // 鼠标 hover 高亮时图形和标签的样式 (当鼠标放上去时 label和itemStyle 的样式)
        label: {
          // label高亮时的配置
          show: true,
          textStyle: {
            color: "transparent", // 高亮时标签颜色变为 白色
          },
        },
      },
        data: convertData(mapData.dataList),
      },
      // 使用和geo3d的配置数据，叠加一层暗沉的厚度
      {
        name: "map3D", // series名称
        type: "map3D", // series图表类型
        map: "map",
        top: setting.top,
        right: setting.right,
        left: "0%",
        bottom: setting.bottom,
        regionHeight: setting.regionHeight - 0.1, // 三维高度 就是模型的高度
        label: {
          // 标签的相关设置
          show: false, // (地图上的城市名称)是否显示标签
        },
        itemStyle: {
          // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
          color: "#008A9E", // 地图板块的颜色(高度切面)
          opacity: 0.8, // 图形的不透明度
          borderWidth: 1, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以清晰的区分每个区域
          borderColor: "#79B4FF", // 图形描边的颜色
        },
        emphasis: {
          // 鼠标hover 高亮时图形和标签的样式 (当鼠标放上去时 label和itemStyle 的样式)
          label: {
            // label高亮时的配置
            show: false,
          },
        },
        viewControl: {
          autoRotate: false, //是否开启视角绕物体的自动旋转查看
          autoRotateDirection: "cw", //物体自转的方向。默认是 'cw' 也就是从上往下看是顺时针方向，也可以取 'ccw'，既从上往下看为逆时针方向
          autoRotateSpeed: 5, //物体旋转的速度
          autoRotateAfterStill: 3, //在鼠标静止操作后恢复自动旋转的时间间隔
          minBeta: -9999, //最小（左）旋转度数
          maxBeta: 9999, //最多（右）旋转角度
          projection: "perspective",
          distance: setting.distance,
          beta: setting.beta,
          alpha: setting.alpha, //视角绕 x 轴，即上下旋转的角度。配合 beta 可以控制视角的方向
        },
      },
    ],
  };
  return options;
}
function initCharts() {
  // 初始化
  let chart = echarts.init(document.getElementById("3dMap"));
  chart.showLoading({
    maskColor: "rgba(0, 0, 0, 1)",
  });
  // 获取地图数据
  echarts.registerMap("map", chinaJson);
  chart.hideLoading();
  let options = getOptions();
  chart.setOption(options);
  // 根据页面大小自动响应图表大小
  window.addEventListener("resize", function () {
    chart.resize();
  });
}
</script>

<style lang="scss" scoped>
.charts-content {
  width: 100vw;
  height: 100vh;
  background: rgb(0, 0, 0);
  h2{
    color: #fff;
    padding-top: 10px;
  }
  img {
    margin-top: 20px;
    width: 239px;
    height: 52px;
  }
}
</style>
