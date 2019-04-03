<template>
  <main class="MainLayout__container container">
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'EmptyLayout',
};
</script>

<style lang="scss" scoped>
.MainLayout__container {
  display: flex;
}
</style>
