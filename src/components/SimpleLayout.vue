<template>
  <v-content class="SimpleLayout__container">
    <v-container
    fluid
    fill-height
    class="pa-0"
    >
      <v-layout
      align-center
      justify-center
      >
        <v-flex
        xs12
        sm10
        md6
        xl4
        >
          <router-view />
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
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
