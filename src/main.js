import 'material-icons/iconfont/material-icons.css';
import 'vuesax/dist/vuesax.css';
import '@/assets/index.styl';

import App from './App.vue';
import SimpleVueValidation from 'simple-vue-validator';
import Vue from 'vue';
import Vuesax from 'vuesax';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(SimpleVueValidation);
Vue.use(Vuesax);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
