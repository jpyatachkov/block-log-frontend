<template>
  <b-navbar
  sticky
  toggleable="lg"
  type="light"
  variant="white"
  >
    <b-navbar-brand :to="{ name: 'home' }">
      <blk-logo class="MainLayoutNavBar__logo mr-2" />
      BlockLog
    </b-navbar-brand>

    <b-navbar-toggle target="nav_collapse" />

    <b-collapse
    id="nav_collapse"
    is-nav
    >
      <b-navbar-nav class="ml-auto">
        <blk-form class="form-inline my-2 my-lg-0 mr-2">
          <course-create-button />
        </blk-form>

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
          Все курсы
        </b-nav-item>

        <b-nav-item-dropdown right>
          <template slot="button-content">
            Аккаунт
          </template>
          <!-- <b-dropdown-item href="#">
            Профиль
          </b-dropdown-item> -->
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

import CourseCreateButton from './CourseCreateButton';

export default {
  name: 'MainLayoutNavBar',

  components: {
    CourseCreateButton,
  },

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
