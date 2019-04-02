<template>
  <div class="SimpleLayout__container container">
    <aside class="SimpleLayout__aside">
      <img
      class="SimpleLayout__logo mt-1 mb-3 pointer"
      src="@/assets/logo.png"
      @click="$router.push({ name: 'home' })"
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

.SimpleLayout__aside {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.SimpleLayout__logo {
  max-height: 350px;
  max-width: 350px;
}
</style>
