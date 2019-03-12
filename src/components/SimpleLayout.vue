<template>
  <vs-row
  class="height-100"
  vs-justify="center"
  vs-align="center"
  >
    <vs-col
    class="height-100"
    type="flex"
    vs-justify="center"
    vs-align="center"
    vs-lg="4"
    vs-md="6"
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
