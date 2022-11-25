import { createRouter,createWebHashHistory} from "vue-router";

const routes = [
  { 
    path: "/",
    redirect: "/index" 
  },
  {
    path: "/index",
    name: "index",
    component: ()=>import('../views/index.vue')
  },
  {
    path: "/echarts",
    name: "echarts",
    meta:{
      title:'3D地图'
    },
    component: ()=>import('../views/echarts.vue')
  },
  {
    path: "/scatter",
    name: "scatter",
    meta:{
      title:'3D散点图'
    },
    component: ()=>import('../views/scatter.vue')
  },
  {
    path: "/line",
    name: "line",
    meta:{
      title:'3D飞线图'
    },
    component: ()=>import('../views/line.vue')
  },
  {
    path: "/bar",
    name: "bar",
    meta:{
      title:'3D柱状图'
    },
    component: ()=>import('../views/bar.vue')
  },
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
  })

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})
  