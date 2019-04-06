import 'babel-polyfill';
import './assets/index.scss';
import './plugins/bootstrap-vue';
import './plugins/simple-vue-validator';
import './plugins/vue-toasted';
import './global-components';

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
