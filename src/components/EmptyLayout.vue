<template>
  <main class="EmptyLayout__container">
    <router-view class="flex-grow-1" />
  </main>
</template>

<script>
export default {
  name: 'EmptyLayout',
};
</script>

<style lang="scss" scoped>
.EmptyLayout {
  &__container {
    display: flex;
    height: 100%;
    min-height: 100%;
  }
}
</style>
