import 'babel-polyfill';
import 'material-icons/iconfont/material-icons.css';
import '@/assets/index.styl';
import '@/plugins/infinite-scroll';
import '@/plugins/vuesax';
import '@/plugins/vuetify';

import App from './App.vue';
import Vue from 'vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
