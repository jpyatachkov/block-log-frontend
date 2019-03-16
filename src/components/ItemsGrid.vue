<template>
  <div
  v-infinite-scroll="onFetch"
  infinite-scroll-disabled="busy"
  infinite-scroll-distance="10"
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

  mounted() {
    // this.$emit('fetch', { page: this.currentPage });
  },

  methods: {
    onFetch() {
      this.currentPage++;
      // this.$emit('fetch', { page: this.currentPage } );
    },
  },
};
</script>
