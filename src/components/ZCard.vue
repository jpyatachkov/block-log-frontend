<template>
  <vs-card :actionable="hoverable">
    <slot />
  </vs-card>
</template>

<script>
export default {
  name: 'ZCard',

  props: {
    hoverable: {
      default: false,
      type: Boolean,
    },
  },
};
</script>
