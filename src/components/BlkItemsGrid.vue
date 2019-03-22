<template>
  <div class="BlkItemsGrid__container">
    <div
    v-for="(item, index) in items"
    :key="index"
    >
      <slot
      :item="item"
      :index="index"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlkItemsGrid',

  props: {
    items: {
      required: true,
      type: Array,
    },
    loading: {
      required: true,
      type: Boolean,
    },
  },

  data: () => ({
    currentPage: 1,
  }),

  methods: {
    triggerFetch() {
      if (this.loading) {
        return;
      }

      this.$emit('fetch', ++this.currentPage);
    },
  },
};
</script>

<style lang="scss" scoped>
.BlkItemsGrid__container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 1rem;
}
</style>
