<template>
  <main class="container">
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'EmptyLayout',
};
</script>

<style lang="scss" scoped>
.EmptyLayout__container {
  background-color: #fff;
}
</style>
