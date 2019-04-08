<template>
  <div>
    <b-form-group
    :description="description"
    :invalid-feedback="invalidFeedback"
    :state="isInvalid"
    >
      <b-form-checkbox
      v-bind="$attrs"
      :state="isInvalid"
      v-on="$listeners"
      >
        <slot />
      </b-form-checkbox>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: 'BlkCheckbox',

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
