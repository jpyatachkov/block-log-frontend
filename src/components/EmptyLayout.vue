<template>
  <main class="MainLayout__container">
    <router-view class="flex-grow-1" />
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
