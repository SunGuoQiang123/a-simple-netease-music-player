import Vue from 'vue'
import VueRouter from 'vue-router'
import testComp from '../components/testComp'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path:'/test',
      name:'testComp',
      component:testComp
    }
  ]
})

export default router
