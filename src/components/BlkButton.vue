<template>
  <b-button
  v-bind="$attrs"
  :class="additionalStyles"
  v-on="$listeners"
  >
    <b-spinner
    v-if="loading"
    small
    />
    <slot />
  </b-button>
</template>

<script>
export default {
  name: 'BlkButton',

  inheritAttrs: false,

  props: {
    loading: {
      default: false,
      type: Boolean,
    },
    round: {
      default: false,
      type: Boolean,
    },
  },

  computed: {
    additionalStyles() {
      return {
        round: this.round,
      };
    },
  },
};
</script>

<style lang="scss">
.round {
  border-radius: 22px;
}

.btn-primary,
.btn-primary:active,
.btn-primary:hover,
.btn-outline-primary:hover,
.btn-secondary,
.btn-secondary:active,
.btn-secondary:hover,
.btn-outline-secondary:hover,
.btn-success,
.btn-success:active,
.btn-success:hover,
.btn-outline-success:hover,
.btn-danger,
.btn-danger:active,
.btn-danger:hover,
.btn-outline-danger:hover,
.btn-warning,
.btn-warning:active,
.btn-warning:hover,
.btn-outline-warning:hover,
.btn-info,
.btn-info:active,
.btn-info:hover,
.btn-outline-info:hover {
  color: white;
}
</style>
