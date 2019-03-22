<template>
  <div>
    <b-form-group
    :description="description"
    :invalid-feedback="invalidFeedback"
    :label="label"
    :state="isInvalid"
    >
      <b-form-input
      v-bind="$attrs"
      :state="isInvalid"
      v-on="$listeners"
      />
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: 'BlkInput',

  inheritAttrs: false,

  props: {
    description: {
      default: '',
      type: String,
    },
    errors: {
      default: () => [],
      type: Array,
    },
    label: {
      required: true,
      type: String,
    },
    value: {
      required: true,
      validator: (v) => !v || v instanceof String || typeof v === 'string',
    },
  },

  computed: {
    invalidFeedback() {
      let feedback = '';

      if (this.errors.length) {
        feedback = this.errors[0];
      }

      return feedback;
    },

    isInvalid() {
      return this.errors.length ? false : null;
    },
  },
};
</script>
