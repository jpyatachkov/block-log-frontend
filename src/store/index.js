import Vue from 'vue';
import Vuex from 'vuex';
import account from './modules/account';

Vue.use(Vuex);

const state = {};

const mutations = {};

const actions = {};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    account,
  },
});
