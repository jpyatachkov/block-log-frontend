<template>
  <main class="height-100">
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
