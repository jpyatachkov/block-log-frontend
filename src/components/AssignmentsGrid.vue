<template>
  <blk-items-grid
  :items="assignments"
  :loading="loading"
  no-items-text="У этого курса пока нет заданий"
  @fetch="$emit('fetch', $event)"
  >
    <template v-slot="{ item, index }">
      <assignment-card
      :assignment="item"
      :index="index"
      />
    </template>
  </blk-items-grid>
</template>

<script>
import AssignmentCard from './AssignmentCard';
import BlkItemsGrid from './BlkItemsGrid';

export default {
  name: 'AssignmentsGrid',

  components: {
    AssignmentCard,
    BlkItemsGrid,
  },

  props: {
    assignments: {
      required: true,
      type: Array,
    },
    loading: {
      required: true,
      type: Boolean,
    },
  },
};
</script>
