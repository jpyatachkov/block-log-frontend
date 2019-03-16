<template>
  <v-alert
  :dismissible="dismissible"
  :type="type"
  :value="value"
  class="mb-3"
  transition="scale-transition"
  @change="$emit('change', $event)"
  @input="$emit('input', $event)"
  >
    <slot />
  </v-alert>
</template>

<script>
import { colorValidator } from '@/utils/validators/props';

export default {
  name: 'ZAlert',

  props: {
    dismissible: {
      default: false,
      type: Boolean,
    },
    type: {
      default: 'error',
      validator: colorValidator,
    },
    value: {
      default: true,
      type: Boolean,
    },
  },
};
</script>
