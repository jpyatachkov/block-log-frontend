<template>
  <div class="width-100">
    <div class="container-fluid">
      <div class="row mt-3 mb-3">
        <div class="col d-flex justify-content-end">
          <blk-button @click="$router.push({ name: 'course_assignments' })">
            Редактировать программу
          </blk-button>
        </div>
      </div>
    </div>

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
