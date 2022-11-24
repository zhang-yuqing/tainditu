import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/home',
    name: 'homeIndex',
    component: () => import('../views/index.vue'),
    children:[
      {
        path: '/tiandi',  //天地地图
        name: 'tiandi',
        component: () => import('../views/map/index.vue')
      },
      {
        path: '/sanwei',
        name: 'sanwei',
        component: () => import('../views/map/sanwei.vue')
      },
      {
        path: '/map', 
        name: 'map',
        component: () => import('../views/map/tiandi.vue')
      },
      {
        path: '/complete',  //完整版天地图
        name: 'complete',
        component: () => import('../views/map/completeTiandiView.vue')
      },
      {
        path: '/parameter',
        name: 'parameter',
        component: () => import('../views/demo/parameter.vue')
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
 
]

const router = new VueRouter({
  routes
})

export default router
