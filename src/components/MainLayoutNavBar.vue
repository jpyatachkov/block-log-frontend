<template>
  <vs-navbar class="MainLayoutNavBar">
    <vs-navbar-title slot="title">
      Block Log
    </vs-navbar-title>

    <vs-navbar-item>
      <router-link :to="{ name: 'home' }">
        Курсы
      </router-link>
    </vs-navbar-item>

    <vs-navbar-item>
      <a href="#">Мой профиль</a>
    </vs-navbar-item>

    <vs-navbar-item>
      <a
      href="#"
      @click.prevent="onLogout"
      >Выход</a>
    </vs-navbar-item>
  </vs-navbar>
</template>

<script>
import { accountComputed, accountMethods } from '@/store/helpers';

export default {
  name: 'MainLayoutNavBar',

  computed: {
    ...accountComputed,
  },

  methods: {
    ...accountMethods,

    async onLogout() {
      await this.logout();
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style lang="stylus" scoped>
.MainLayoutNavBar
  background-color white !important
  min-height 55px
</style>
