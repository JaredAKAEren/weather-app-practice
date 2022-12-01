import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CityView from '../views/CityView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: "首页"
      }
    },
    {
      path: '/weather/:province/:city',
      name: 'cityView',
      component: CityView,
      meta: {
        title: "天气"
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.params.province
      ? `${to.params.city}, ${to.params.province}`
      : to.meta.title
    } | 本地天气`;
  next();
});

export default router
