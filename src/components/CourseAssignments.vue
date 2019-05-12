<template>
  <div class="width-100">
    <div class="container-fluid">
      <div class="row mt-3 mb-3">
        <div class="col d-flex justify-content-end">
          <edit-button
          v-if="userIsCollaborator || userIsModerator"
          @click="onEditProgramClick"
          >
            Редактировать программу
          </edit-button>
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
import { assignmentsMethods, coursePermissions } from '@/store/helpers';

import AssignmentsProgress from './AssignmentsProgress';
import AssignmentsTable from './AssignmentsTable';
import EditButton from './EditButton';

export default {
  name: 'CourseAssignments',

  components: {
    AssignmentsProgress,
    AssignmentsTable,
    EditButton,
  },

  computed: {
    ...coursePermissions,
  },

  methods: {
    ...assignmentsMethods,

    onEditProgramClick() {
      this.clearAssignments();
      this.$router.push({ name: 'course_assignments' });
    },
  },
};
</script>
