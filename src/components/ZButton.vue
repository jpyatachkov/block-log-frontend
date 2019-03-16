<template>
  <v-btn
  :block="wide"
  :color="color"
  :disabled="disabled"
  :flat="flat"
  :icon="icon"
  :large="large"
  :loading="loading"
  :outline="outline"
  :round="round"
  :small="small"
  :type="type"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: 'ZButton',

  props: {
    color: {
      default: 'primary',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    flat: {
      default: false,
      type: Boolean,
    },
    icon: {
      default: false,
      type: Boolean,
    },
    large: {
      default: false,
      type: Boolean,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    outline: {
      default: false,
      type: Boolean,
    },
    round: {
      default: false,
      type: Boolean,
    },
    small: {
      default: false,
      type: Boolean,
    },
    type: {
      default: 'button',
      type: String,
    },
    wide: {
      default: false,
      type: Boolean,
    },
  },
};
</script>
