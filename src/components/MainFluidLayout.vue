<template>
  <base-layout>
    <router-view />
  </base-layout>
</template>

<script>
import BaseLayout from './BaseLayout';

export default {
  name: 'MainFluidLayout',

  components: {
    BaseLayout,
  },
};
</script>
