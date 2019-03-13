<template>
  <vs-button
  :color="color"
  :disabled="disabled"
  :icon="icon"
  :size="size"
  :type="type"
  >
    <slot />
  </vs-button>
</template>

<script>
import { colorValidator } from '@/utils/validators/props';

export default {
  name: 'ZButton',

  props: {
    color: {
      default: 'primary',
      validator: colorValidator,
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
      default: '',
      type: String,
    },
    outline: {
      default: false,
      type: Boolean,
    },
    size: {
      default: 'default',
      type: String,
    },
  },

  computed: {
    type() {
      if (this.flat) {
        return 'flat';
      } else if (this.outline) {
        return 'border';
      } else {
        return 'filled';
      }
    },
  },
};
</script>
