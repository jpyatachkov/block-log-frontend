<template>
  <div>
    <assignment-card
    :assignment="assignment"
    :is-edit-mode="isEditMode"
    :preview="false"
    @edit="changeEditState"
    />

    <assignment-edit-card
    v-if="isEditMode"
    class="mt-3 mb-3"
    />

    <solution-create-card
    v-if="userIsEnrolled"
    class="mt-3 mb-3"
    />
  </div>
</template>

<script>
import { FetchResourceMixin, MainLayoutMixin } from '@/mixins';
import {
  assignmentsComputed,
  assignmentsMethods,
  coursePermissions,
  coursesMethods,
} from '@/store/helpers';

import AssignmentCard from '@/components/AssignmentCard';
import AssignmentEditCard from '@/components/AssignmentEditCard';
import SolutionCreateCard from '@/components/SolutionCreateCard';

export default {
  name: 'Assignment',

  components: {
    AssignmentCard,
    AssignmentEditCard,
    SolutionCreateCard,
  },

  mixins: [FetchResourceMixin, MainLayoutMixin],

  computed: {
    ...assignmentsComputed,
    ...coursePermissions,

    isEditMode() {
      const idAsString = `${this.$route.params.id}`;
      return this.assignmentsEditState.includes(idAsString);
    },
  },

  methods: {
    ...assignmentsMethods,
    ...coursesMethods,

    changeEditState(isEditMode) {
      const id = `${this.$route.params.id}`;
      this.changeAssignmentsEditState({ id, isEditMode });
    },

    async doFetch() {
      const courseId = this.$route.params.courseId;
      const assignmentId = this.$route.params.id;

      await this.getCourse({ courseId });
      await this.getAssignment({ courseId, assignmentId });
    },
  },
};
</script>
