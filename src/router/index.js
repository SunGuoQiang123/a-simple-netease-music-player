import Vue from 'vue';
import VueRouter from 'vue-router';
import testComp from '../components/testComp';
import SongDetail from '../pages/SongDetail';
import Search from '../pages/Search';

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/search'
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path:'/test',
      name:'testComp',
      component:testComp
    },
    {
      path: '/song/:id',
      name:'songDetail',
      component: SongDetail
    }
  ]
})

router.beforeEach((to, from, next) => {
  next();
});

export default router
