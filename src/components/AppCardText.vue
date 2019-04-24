<template>
  <b-card-text
  v-bind="$attrs"
  v-on="$listeners"
  >
    <slot />
  </b-card-text>
</template>

<script>
export default {
  name: 'AppCardText',

  inheritAttrs: false,
};
</script>
