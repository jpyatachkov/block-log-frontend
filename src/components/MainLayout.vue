<template>
  <main
  class="height-100 d-flex flex-column justify-content-center align-items-center"
  >
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
