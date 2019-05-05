<template>
  <div class="form-check">
    <input
    ref="checkbox"
    type="checkbox"
    class="form-check-input"
    >
    <label class="form-check-label">
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: 'AppCheckbox',

  props: {
    value: {
      required: true,
      validator: (v) => !v || v instanceof Boolean || typeof v === 'boolean',
    },
  },

  mounted() {
    this.$refs.checkbox.addEventListener('click', this.onCheckboxCheck);
  },

  beforeDestroy() {
    this.$refs.checkbox.removeEventListener('click', this.onCheckboxCheck);
  },

  methods: {
    onCheckboxCheck() {
      this.$emit('change', !this.value);
      this.$emit('input', !this.value);
    },
  },
};
</script>
