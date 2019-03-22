<template>
  <div class="SimpleLayout__container container height-100">
    <aside class="SimpleLayout__logo">
      <img
      class="mt-1 mb-3"
      src="@/assets/logo.png"
      >
      <h2>BlockLog</h2>
    </aside>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'SimpleLayout',
};
</script>

<style lang="scss" scoped>
.SimpleLayout__container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}

.SimpleLayout__logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
