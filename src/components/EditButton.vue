<template>
  <blk-button
  :variant="variant"
  @click="$emit('click')"
  >
    <img :src="require('@/assets/edit.png')"> <slot />
  </blk-button>
</template>

<script>
export default {
  name: 'AddButton',

  props: {
    variant: {
      default: 'secondary',
      type: String,
    },
  },
};
</script>
