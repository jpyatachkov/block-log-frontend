<template>
  <items-grid
  :items="assignments"
  :total="assignmentsTotal"
  z-sm="12"
  z-lg="12"
  @fetch="onFetch"
  >
    <template v-slot:default="props">
      <assignment-card
      :assignment="props.item"
      :number="props.number"
      />
    </template>
  </items-grid>
</template>

<script>
import { assignmentsComputed, assignmentsMethods } from '@/store/helpers';

import AssignmentCard from './AssignmentCard';
import ItemsGrid from './ItemsGrid';

export default {
  name: 'AssignmentsGrid',

  components: {
    AssignmentCard,
    ItemsGrid,
  },

  computed: {
    ...assignmentsComputed,
  },

  methods: {
    ...assignmentsMethods,

    async onFetch({ page }) {
      const courseId = this.$route.params.id;
      await this.getAssignments({ courseId, page });
    },
  },
};
</script>
