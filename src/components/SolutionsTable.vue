<template>
  <div class="SolutionsTable__container">
    <b-table
    :fields="fields"
    :items="solutions"
    :tbody-tr-class="rowClass"
    bordered
    >
      <template v-slot:index="{ index }">
        {{ index + 1 }}
      </template>

      <template v-slot:isCorrect="{ value }">
        {{ value ? 'Принято' : 'Не принято' }}
      </template>
    </b-table>

    <blk-button
    v-if="canLoadMoreSolutions"
    :disabled="loading"
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
import { solutionsComputed } from '@/store/helpers';

export default {
  name: 'SolutionsTable',

  props: {
    loading: {
      required: true,
      type: Boolean,
    },
  },

  data: () => ({
    currentPage: 1,
    fields: {
      index: {
        label: 'Номер',
        sortable: false,
      },
      isCorrect: {
        label: 'Статус решения',
        sortable: false,
      },
    },
  }),

  computed: {
    ...solutionsComputed,
  },

  methods: {
    rowClass(item, type) {
      if (!item) {
        return;
      }

      let rowClass;

      if (item.isCorrect) {
        rowClass = 'table-success';
      } else {
        rowClass = 'table-danger';
      }

      return rowClass;
    },

    triggerFetch() {
      this.$emit('fetch', { page: this.currentPage++ });
    },
  },
};
</script>

<style>
.SolutionsTable__container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>
