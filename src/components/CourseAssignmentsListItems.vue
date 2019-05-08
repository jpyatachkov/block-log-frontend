<template>
  <div class="w-100 mt-3">
    <app-lazy-container
    v-if="assignmentsTotal"
    :can-load-more="canLoadMoreAssignments"
    :loading="loading"
    @fetch="$emit('fetch-assignments', $event)"
    >
      <div class="w-100 mb-3">
        <div
        v-for="(assignment, index) in assignments"
        :key="assignment.id"
        class="w-100"
        >
          <assignment-row
          :assignment="assignment"
          :is-first="index === 0"
          :is-last="index === assignments.length - 1"
          :number="index + 1"
          />
        </div>
      </div>
    </app-lazy-container>
    <div
    v-else-if="!loading && !assignmentsTotal"
    class="CourseAssignmentsListItems__empty"
    >
      У этого курса пока нет заданий...
    </div>
  </div>
</template>

<script>
import AssignmentRow from './AssignmentRow';
import { assignmentsComputed } from '@/store/helpers';

export default {
  name: 'CourseAssignmentsListItems',

  components: {
    AssignmentRow,
  },

  props: {
    loading: {
      required: true,
      type: Boolean,
    },
  },

  computed: {
    ...assignmentsComputed,
  },
};
</script>

<style lang="scss">
.CourseAssignmentsListItems {
  &__empty {
    width: 100%;
    padding: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
