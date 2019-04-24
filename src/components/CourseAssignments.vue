<template>
  <assignments-table @fetch-assignments="$emit('fetch-assignments', $event)" />
</template>

<script>
import AssignmentsTable from './AssignmentsTable';

export default {
  name: 'CourseAssignments',

  components: {
    AssignmentsTable,
  },
};
</script>
