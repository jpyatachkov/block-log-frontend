<template>
  <b-navbar
  toggleable="lg"
  type="light"
  variant="white"
  >
    <b-navbar-brand :to="{ name: 'home' }">
      <img
      class="MainLayoutNavBar__logo mr-2"
      src="@/assets/logo.png"
      >
      BlockLog
    </b-navbar-brand>

    <b-navbar-toggle target="nav_collapse" />

    <b-collapse
    id="nav_collapse"
    is-nav
    >
      <b-navbar-nav class="ml-auto">
        <b-nav-item
        :active="myCoursesIsActive"
        :to="{ name: 'my_courses' }"
        >
          Мои Курсы
        </b-nav-item>

        <b-nav-item
        :active="coursesActive"
        :to="{ name: 'courses' }"
        >
          Курсы
        </b-nav-item>

        <b-nav-item-dropdown right>
          <template slot="button-content">
            <em>{{ `${user.firstName} ${user.lastName}` }}</em>
          </template>
          <b-dropdown-item href="#">
            Профиль
          </b-dropdown-item>
          <b-dropdown-item @click="onLogout">
            Выход
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { accountComputed, accountMethods } from '@/store/helpers';

export default {
  name: 'MainLayoutNavBar',

  computed: {
    ...accountComputed,

    myCoursesIsActive() {
      return this.$route.name === 'my_courses';
    },

    coursesActive() {
      return this.$route.name === 'courses';
    },
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

<style>
.MainLayoutNavBar__logo {
  max-width: 50px;
  max-height: 50px;
}
</style>
