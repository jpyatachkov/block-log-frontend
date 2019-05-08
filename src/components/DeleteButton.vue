<template>
  <blk-button
  variant="danger"
  @click="$emit('click')"
  >
    <img :src="require('@/assets/delete.png')">
  </blk-button>
</template>

<script>
export default {
  name: 'DeleteButton',
};
</script>
