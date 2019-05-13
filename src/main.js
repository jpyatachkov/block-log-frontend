import 'babel-polyfill';
import './assets/index.scss';
import './plugins/bootstrap-vue';
import './plugins/simple-vue-validator';
import './plugins/vue-content-placeholders';
import './plugins/vue-toasted';
import './global-components';

import App from './App.vue';
import Vue from 'vue';
import { initEventBus } from './bus';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

initEventBus();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
