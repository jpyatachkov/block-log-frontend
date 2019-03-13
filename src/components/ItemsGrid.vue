<template>
  <div>
    <vs-row vs-w="12">
      <vs-col
      v-for="(item, index) in items"
      :key="index"
      class="pa-1"
      vs-xs="12"
      vs-sm="6"
      vs-lg="3"
      >
        <slot
        :item="item"
        :number="index"
        />
      </vs-col>
    </vs-row>

    <vs-row
    v-if="items && items.length"
    class="mt-2 mb-2"
    vs-align="center"
    vs-type="flex"
    vs-justify="flex-end"
    vs-w="12"
    >
      <vs-pagination
      v-model="currentPage"
      :total="total"
      />
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
    total: {
      required: true,
      type: Number,
    },
  },

  data: () => ({
    currentPage: 1,
  }),

  watch: {
    currentPage() {
      this.$emit('fetch', { page: this.currentPage });
    },
  },

  mounted() {
    this.$emit('fetch', { page: this.currentPage });
  },
};
</script>
