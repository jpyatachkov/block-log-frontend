<template>
  <v-hover>
    <v-card
    slot-scope="{ hover }"
    :class="`elevation${hover ? 5 : 15}`"
    >
      <slot />
    </v-card>
  </v-hover>
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
