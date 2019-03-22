<template>
  <b-alert
  v-bind="$attrs"
  v-on="$listeners"
  >
    <slot />
  </b-alert>
</template>

<script>
export default {
  name: 'BlkAlert',

  inheritAttrs: false,
};
</script>
