<template>
  <b-navbar-nav
  v-if="userDisplayName"
  class="ml-auto d-flex align-items-center"
  >
    <b-nav-item>
      <img
      v-if="userCanCreateCourses"
      src="@/assets/teacher.png"
      class="bg-white circle"
      >
      <img
      v-else
      src="@/assets/student.png"
      class="bg-white circle"
      >
    </b-nav-item>

    <b-nav-item-dropdown right>
      <template slot="button-content">
        {{ userDisplayName }}
      </template>

      <b-dropdown-item @click="onLogout">
        Выйти
      </b-dropdown-item>
    </b-nav-item-dropdown>
  </b-navbar-nav>
</template>

<script>
import { accountComputed, accountMethods } from '@/store/helpers';

export default {
  name: 'AccountDropdown',

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

<style lang="scss" scoped>
.AccountDropdown__img {
  background-color: white;
  border-radius: 50%;
}
</style>
