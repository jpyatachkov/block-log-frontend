<template>
  <vs-input
  class="fill-width"
  :danger="danger"
  :danger-text="dangerText"
  :disabled="disabled"
  :icon="icon"
  :label-placeholder="label"
  :success="success"
  :success-text="successText"
  :type="type"
  :value="value"
  :warning="warning"
  :warning-text="warningText"
  @change="$emit('change', $event)"
  @input="$emit('input', $event)"
  />
</template>

<script>
export default {
  name: 'ZFormGroup',

  props: {
    danger: {
      default: false,
      type: Boolean,
    },
    dangerText: {
      default: '',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    icon: {
      default: '',
      type: String,
    },
    label: {
      required: true,
      type: String,
    },
    success: {
      default: false,
      type: Boolean,
    },
    successText: {
      default: '',
      type: String,
    },
    type: {
      default: 'text',
      type: String,
    },
    value: {
      required: true,
      validator: (v) =>
        typeof v === 'string' || v instanceof String || v === null,
    },
    warning: {
      default: false,
      type: Boolean,
    },
    warningText: {
      default: '',
      type: String,
    },
  },
};
</script>
