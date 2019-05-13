<template>
  <div class="width-100">
    <div class="container-fluid">
      <div class="row mt-3 mb-3">
        <div class="col d-flex justify-content-end">
          <edit-button
          v-if="!loading && (userIsCollaborator || userIsModerator)"
          @click="onEditProgramClick"
          >
            Редактировать программу
          </edit-button>
        </div>
      </div>
    </div>

    <content-placeholders
    v-if="loading"
    class="m-3"
    >
      <content-placeholders-text :lines="1" />
    </content-placeholders>
    <assignments-progress
    v-else-if="!!assignments"
    class="mt-2 mb-4"
    />

    <content-placeholders
    v-if="loading"
    class="m-3"
    >
      <content-placeholders-text :lines="7" />
    </content-placeholders>
    <assignments-table
    v-else-if="!!assignments"
    @fetch-assignments="$emit('fetch-assignments', $event)"
    />
  </div>
</template>

<script>
import {
  assignmentsComputed,
  assignmentsMethods,
  coursePermissions,
} from '@/store/helpers';

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

  props: {
    loading: {
      required: true,
      type: Boolean,
    },
  },

  computed: {
    ...assignmentsComputed,
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
