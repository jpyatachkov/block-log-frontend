<template>
  <div>
    <assignment-card
    :assignment="assignment"
    :is-edit-mode="!testing && isEditMode"
    :preview="false"
    @edit="changeEditState"
    />

    <assignment-edit-card
    v-if="!testing && isEditMode"
    class="mt-3 mb-3"
    />

    <solution-create-card
    v-if="!testing && userIsEnrolled"
    class="mt-3 mb-3"
    />

    <div v-if="userIsEnrolled">
      <blk-card
      v-if="testing"
      class="Assignment__test-placeholder mt-3 mb-3"
      >
        <h6>Тестируем решение...</h6>
        <blk-loader />
      </blk-card>
      <blk-card v-else>
        <solutions-table
        v-if="!loading"
        @fetch="onSolutionsFetch"
        />
        <blk-loader v-else />
      </blk-card>
    </div>
  </div>
</template>

<script>
import { LoadingMixin, MainLayoutMixin } from '@/mixins';
import {
  assignmentsComputed,
  assignmentsMethods,
  coursePermissions,
  coursesMethods,
  rootComputed,
  solutionsComputed,
  solutionsMethods,
} from '@/store/helpers';

import AssignmentCard from '@/components/AssignmentCard';
import AssignmentEditCard from '@/components/AssignmentEditCard';
import SolutionCreateCard from '@/components/SolutionCreateCard';
import SolutionsTable from '@/components/SolutionsTable';
import { VuexService } from '@/services';

export default {
  name: 'Assignment',

  components: {
    AssignmentCard,
    AssignmentEditCard,
    SolutionCreateCard,
    SolutionsTable,
  },

  mixins: [LoadingMixin, MainLayoutMixin],

  computed: {
    ...assignmentsComputed,
    ...coursePermissions,
    ...rootComputed,
    ...solutionsComputed,

    isEditMode() {
      const idAsString = `${this.$route.params.id}`;
      return this.assignmentsEditState.includes(idAsString);
    },
  },

  async created() {
    // bus.$on(EVENTS.WAIT_PROGRAM_TO_TEST, this.onWaitProgramToTest);
    // bus.$on(EVENTS.PROGRAM_LOADED, this.onProgramLoaded);

    this.clearSolutions();

    if (!this.solutionSent) {
      await this.doFetch();
    }

    // if (this.solutionSent) {
    //   console.log('Wait program to test');
    //   await this.onSolutionsFetch();
    // } else {
    //   await this.doFetch();
    // }
  },

  destroyed() {
    // bus.$off(EVENTS.WAIT_PROGRAM_TO_TEST, this.onWaitProgramToTest);
    // bus.$off(EVENTS.PROGRAM_LOADED, this.onProgramLoaded);

    if (!this.solutionSent) {
      VuexService.clear();
    }
  },

  methods: {
    ...assignmentsMethods,
    ...coursesMethods,
    ...solutionsMethods,

    changeEditState(isEditMode) {
      const id = `${this.$route.params.id}`;
      this.changeAssignmentsEditState({ id, isEditMode });
    },

    async doFetch() {
      this.setLoading(true);

      const courseId = this.$route.params.courseId;
      const assignmentId = this.$route.params.id;

      await this.getCourse({ courseId });
      await this.getAssignment({ courseId, assignmentId });
      await this.getSolutions({ courseId, assignmentId });

      this.setLoading(false);
    },

    async onSolutionsFetch({ page = 1 } = {}) {
      const courseId = this.$route.params.courseId;
      const assignmentId = this.$route.params.id;

      await this.getSolutions({ courseId, assignmentId, page });
    },

    onWaitProgramToTest() {
      console.log('onWaitProgramToTest');
      this.testing = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.Assignment__test-placeholder {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>
