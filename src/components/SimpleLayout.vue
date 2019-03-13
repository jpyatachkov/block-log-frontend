<template>
  <vs-row
  class="height-100"
  vs-justify="center"
  vs-align="center"
  >
    <vs-col
    class="height-100 SimpleLayout__container"
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
  min-width 300px
</style>
