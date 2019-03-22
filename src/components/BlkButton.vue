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

<style lang="scss" scoped>
.round {
  border-radius: 20px;
}
</style>
