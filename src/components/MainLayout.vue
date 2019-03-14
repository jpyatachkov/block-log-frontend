<template>
  <main class="MainLayout__container height-100">
    <main-layout-nav-bar />
    <main-layout-content />
  </main>
</template>

<script>
import MainLayoutContent from './MainLayoutContent';
import MainLayoutNavBar from './MainLayoutNavBar';

export default {
  name: 'MainLayout',

  components: {
    MainLayoutContent,
    MainLayoutNavBar,
  },
};
</script>

<style lang="stylus" scoped>
.MainLayout__container
  background-color #fcfcfc
</style>
