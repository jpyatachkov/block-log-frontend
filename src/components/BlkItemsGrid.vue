<template>
  <div>
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

    <blk-loader v-if="loading" />
  </div>
</template>

<script>
import { getPageHeight, getScrollHeight } from '@/utils/helpers';

const FETCH_SCROLL_THRESHOLD = 50;

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

  created() {
    window.addEventListener('scroll', this.handleScroll);
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    handleScroll() {
      if (this.loading) {
        return;
      }

      const alreadyScrolled = getScrollHeight();
      const pageHeight = getPageHeight();

      if (Math.abs(alreadyScrolled - pageHeight) <= FETCH_SCROLL_THRESHOLD) {
        this.triggerFetch();
      }
    },

    triggerFetch() {
      this.$emit('fetch', { page: this.currentPage++ });
    },
  },
};
</script>

<style lang="scss" scoped>
.BlkItemsGrid__container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 1rem;
}
</style>
