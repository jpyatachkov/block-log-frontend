<template>
  <b-modal
  v-bind="$attrs"
  v-on="$listeners"
  >
    <slot />
  </b-modal>
</template>

<script>
export default {
  name: 'BlkModal',

  inheritAttrs: false,
};
</script>
