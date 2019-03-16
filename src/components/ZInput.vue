<template>
  <v-text-field
  :append-icon="appendIcon"
  :autofocus="autofocus"
  :clearable="clearable"
  :disabled="disabled"
  :error-messages="errorMessages"
  :full-width="fullWidth"
  :label="label"
  :prepend-icon="prependIcon"
  :rules="rules"
  :type="type"
  :value="value"
  outline
  @change="$emit('change', $event)"
  @input="$emit('input', $event)"
  />
</template>

<script>
import { iconValidator } from '@/utils/validators/props';

export default {
  name: 'ZInput',

  props: {
    appendIcon: {
      default: undefined,
      validator: iconValidator,
    },
    autofocus: {
      default: false,
      type: Boolean,
    },
    clearable: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    errorMessages: {
      default: () => [],
      type: Array,
    },
    fullWidth: {
      default: false,
      type: Boolean,
    },
    label: {
      required: true,
      type: String,
    },
    prependIcon: {
      default: undefined,
      validator: iconValidator,
    },
    rules: {
      required: true,
      type: Array,
    },
    type: {
      default: 'text',
      type: String,
    },
    value: {
      required: true,
      validator: (v) => !v || v instanceof String || typeof v === 'string',
    },
  },
};
</script>
