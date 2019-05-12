<template>
  <b-navbar
  style="background-color: #297ab5;"
  toggleable="lg"
  type="dark"
  >
    <b-navbar-brand>
      <blk-logo class="CourseProgressNavbar__logo mr-2" />
      BlockLog
    </b-navbar-brand>

    <b-navbar-toggle target="nav_collapse" />

    <b-collapse
    id="nav_collapse"
    is-nav
    >
      <account-dropdown />
    </b-collapse>
  </b-navbar>
</template>

<script>
import AccountDropdown from './AccountDropdown';

export default {
  name: 'CourseProgressNavbar',

  components: {
    AccountDropdown,
  },
};
</script>

<style lang="scss" scoped>
.CourseProgressNavbar__logo {
  max-width: 50px;
  max-height: 50px;
}
</style>
