<template>
  <div class="width-100">
    <assignments-progress class="mt-2 mb-4" />
    <assignments-table
    @fetch-assignments="$emit('fetch-assignments', $event)"
    />
  </div>
</template>

<script>
import AssignmentsProgress from './AssignmentsProgress';
import AssignmentsTable from './AssignmentsTable';

export default {
  name: 'CourseAssignments',

  components: {
    AssignmentsProgress,
    AssignmentsTable,
  },
};
</script>
