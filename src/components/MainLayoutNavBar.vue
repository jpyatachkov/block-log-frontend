<template>
  <b-navbar
  sticky
  style="background-color: #76bdf1;"
  toggleable="lg"
  type="dark"
  >
    <b-navbar-brand :to="{ name: 'home' }">
      <blk-logo class="MainLayoutNavBar__logo bg-white mr-2" />
      BlockLog
    </b-navbar-brand>

    <b-navbar-toggle target="nav_collapse" />

    <b-collapse
    id="nav_collapse"
    is-nav
    >
      <b-navbar-nav>
        <b-nav-item
        :active="coursesIsActive"
        :to="{ name: 'courses' }"
        >
          Каталог
        </b-nav-item>

        <b-nav-item
        :active="myCoursesIsActive"
        :to="{ name: 'my_courses' }"
        >
          Мои Курсы
        </b-nav-item>

        <blk-form class="form-inline my-2 my-lg-0 ml-2 mr-2">
          <course-create-button />
        </blk-form>
      </b-navbar-nav>

      <account-dropdown />
    </b-collapse>
  </b-navbar>
</template>

<script>
import AccountDropdown from './AccountDropdown';
import CourseCreateButton from './CourseCreateButton';

export default {
  name: 'MainLayoutNavBar',

  components: {
    AccountDropdown,
    CourseCreateButton,
  },

  computed: {
    coursesIsActive() {
      return this.$route.name === 'courses';
    },

    myCoursesIsActive() {
      return this.$route.name === 'my_courses';
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
