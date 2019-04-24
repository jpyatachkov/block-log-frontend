<template>
  <app-lazy-container
  :can-load-more="canLoadMoreAssignments"
  :loading="loading"
  @fetch="$emit('fetch-assignments', $event)"
  >
    <b-table
    :fields="fields"
    :items="assignments"
    >
      <template v-slot:index="{ index }">
        {{ index + 1 }}
      </template>

      <template v-slot:title="{ value }">
        {{ value }}
      </template>
    </b-table>
  </app-lazy-container>
</template>

<script>
import { assignmentsComputed } from '@/store/helpers';

export default {
  name: 'AssignmentsTable',

  props: {
    loading: {
      default: false,
      type: Boolean,
    },
  },

  data: () => ({
    fields: {
      index: {
        label: '#',
        sortable: false,
      },
      title: {
        label: 'Задание',
        sortable: false,
      },
    },
  }),

  computed: {
    ...assignmentsComputed,
  },
};
</script>
