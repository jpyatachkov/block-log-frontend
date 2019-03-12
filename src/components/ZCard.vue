<template>
  <vs-card :actionable="hoverable">
    <template slot="header">
      <slot name="header" />
    </template>

    <slot />

    <template name="footer">
      <slot name="footer" />
    </template>
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
