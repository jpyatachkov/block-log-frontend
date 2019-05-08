<template>
  <blk-button
  variant="outline-success"
  @click="$emit('click')"
  >
    <img :src="require('@/assets/add.png')"> <slot />
  </blk-button>
</template>

<script>
export default {
  name: 'AddButton',
};
</script>
