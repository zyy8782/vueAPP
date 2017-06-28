/* 依赖包 */
import Vue from 'vue';
import waimai from './waimai.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import commodity from './components/content/commodity/commodity.vue';
import evaluate from './components/content/evaluate/evaluate.vue';
import merchant from './components/content/merchant/merchant.vue';
import wares from './components/wares/wares.vue';
import home from './components/home/home.vue';

import stylus from '../src/common/stylus/index.styl'
/* 注册路由 */
Vue.use(VueRouter);
Vue.use(VueResource);
/* 实例化路由 */
let router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/home/commodity'
    },
    {
      name: 'wares',
      path: '/wares',
      component: wares
    },
    {
      path: '/home',
      component: home,
      children: [
        {
          name:'evaluate',
          path: '/home/evaluate',
          component: evaluate
        },
        {
          name: 'merchant',
          path: '/home/merchant',
          component: merchant
        },
        {
          name: 'commodity',
          path: '/home/commodity',
          component: commodity
        },
      ]
    }
  ]
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<waimai/>',
  components: { waimai }
});
