<template>
  <div class="AppLazyContainer">
    <slot />

    <blk-button
    v-if="canLoadMore"
    :loading="loading"
    round
    type="submit"
    variant="outline-primary"
    @click="triggerFetch"
    >
      Загрузить еще
    </blk-button>
  </div>
</template>

<script>
export default {
  name: 'AppLazyContainer',

  props: {
    canLoadMore: {
      required: true,
      type: Boolean,
    },
    loading: {
      default: false,
      type: Boolean,
    },
  },

  data: () => ({
    currentPage: 1,
  }),

  methods: {
    triggerFetch() {
      this.$emit('fetch', { page: this.currentPage++ });
    },
  },
};
</script>

<style lang="scss" scoped>
.AppLazyContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>
