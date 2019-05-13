<template>
  <div class="SolutionsTable__container">
    <b-table
    :fields="fields"
    :items="solutionsWithDate"
    >
      <template v-slot:index="{ index }">
        {{ index + 1 }}
      </template>

      <template v-slot:createdAt="{ value }">
        {{ value }}
      </template>

      <template v-slot:isCorrect="{ value }">
        <app-status :success="value" />
      </template>
    </b-table>

    <blk-button
    v-if="canLoadMoreSolutions"
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

  data: () => ({
    currentPage: 1,
    fields: {
      index: {
        label: '#',
        sortable: false,
      },
      createdAt: {
        label: 'Решение',
        sortable: false,
      },
      isCorrect: {
        label: 'Статус',
        class: 'text-center',
        sortable: false,
      },
    },
  }),

  computed: {
    ...solutionsComputed,

    solutionsWithDate() {
      return this.solutions.map((solution) => {
        const dateParts = solution.createdAt.split('T');
        const date = dateParts[0];
        const time = dateParts[1].split('.')[0];

        const formatted = `${date
          .split('-')
          .reverse()
          .join('.')} ${time}`;

        solution.createdAt = formatted;

        return solution;
      });
    },
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
