<template>
  <vs-alert
  :active="value"
  :closable="dismissible"
  close-icon="close"
  :color="color"
  :icon="icon"
  :title="title"
  @update:active="onUpdateValue"
  >
    <slot />
  </vs-alert>
</template>

<script>
import { colorValidator } from '@/utils/validators/props';

export default {
  name: 'ZAlert',

  props: {
    color: {
      default: 'primary',
      validator: colorValidator,
    },
    dismissible: {
      default: false,
      type: Boolean,
    },
    icon: {
      default: '',
      type: String,
    },
    title: {
      default: '',
      type: String,
    },
    value: {
      default: true,
      type: Boolean,
    },
  },

  methods: {
    onUpdateValue(evt) {
      this.$emit('input', evt);
      this.$emit('change', evt);
    },
  },
};
</script>
