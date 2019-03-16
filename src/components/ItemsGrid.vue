<template>
  <div
  v-infinite-scroll="onFetch"
  infinite-scroll-distance="10"
  :infinite-scroll-disabled="loading"
  >
    <vs-row vs-w="12">
      <vs-col
      v-for="(item, index) in items"
      :key="index"
      class="pa-1"
      :vs-lg="zLg"
      :vs-sm="zSm"
      :vs-xs="zXs"
      >
        <slot
        :item="item"
        :number="index"
        />
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  name: 'ItemsGrid',

  props: {
    items: {
      required: true,
      type: Array,
    },
    loading: {
      required: true,
      type: Boolean,
    },
    zLg: {
      default: 4,
      type: Number,
    },
    zSm: {
      default: 6,
      type: Number,
    },
    zXs: {
      default: 12,
      type: Number,
    },
  },

  data: () => ({
    currentPage: 1,
  }),

  methods: {
    async onFetch() {
      if (this.loading) {
        return;
      }

      this.$emit('fetch', { page: ++this.currentPage });
    },
  },
};
</script>
