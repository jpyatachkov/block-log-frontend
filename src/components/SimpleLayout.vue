<template>
  <vs-row
  class="SimpleLayout__container height-100"
  vs-justify="center"
  vs-align="center"
  >
    <vs-col
    class="height-100 SimpleLayout__content"
    type="flex"
    vs-justify="center"
    vs-align="center"
    vs-lg="3"
    vs-sm="8"
    vs-xs="12"
    >
      <router-view />
    </vs-col>
  </vs-row>
</template>

<script>
export default {
  name: 'SimpleLayout',
};
</script>

<style lang="stylus" scoped>
.SimpleLayout__container
  background linear-gradient(to bottom, #FFF 55%, #FF6EBA 15%, #AF84FF 30%)

.SimpleLayout__content
  min-width 300px
</style>
