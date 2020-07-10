import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../views/Test.vue'
import { test } from 'mocha';
import Sousuo from '../views/Sousuo.vue'
import Tablesel from '../views/Tablesel.vue'
import SelectUniversityBaseScore from '../views/SelectUniversityBaseScore.vue'
Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Test
  },
  {
    path: '/SelectUniversityBaseScore',
    name: 'SelectUniversityBaseScore',
    component: SelectUniversityBaseScore
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/test',
    name: 'Test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Test
  },
  {
    path: '/sousuo',
    name: 'Sousuo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Sousuo
  },
  {
    path: '/tablesel',
    name: 'Tablesel',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Tablesel
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
