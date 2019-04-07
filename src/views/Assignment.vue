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

    <blk-card
    v-if="testing"
    class="Assignment__test-placeholder mt-3 mb-3"
    >
      <h6>Тестируем решение...</h6>
      <blk-loader />
    </blk-card>
    <blk-card v-else>
      <solutions-table
      :loading="loading"
      @fetch="onSolutionsFetch"
      />
    </blk-card>
  </div>
</template>

<script>
import { LoadingMixin, MainLayoutMixin } from '@/mixins';
import {
  assignmentsComputed,
  assignmentsMethods,
  coursePermissions,
  coursesMethods,
  solutionsComputed,
  solutionsMethods,
} from '@/store/helpers';
import bus, { EVENTS } from '@/bus';

import AssignmentCard from '@/components/AssignmentCard';
import AssignmentEditCard from '@/components/AssignmentEditCard';
import { EditorService } from '@/services';
import SolutionCreateCard from '@/components/SolutionCreateCard';
import SolutionsTable from '@/components/SolutionsTable';

export default {
  name: 'Assignment',

  components: {
    AssignmentCard,
    AssignmentEditCard,
    SolutionCreateCard,
    SolutionsTable,
  },

  mixins: [LoadingMixin, MainLayoutMixin],

  data: () => ({
    testing: false,
  }),

  computed: {
    ...assignmentsComputed,
    ...coursePermissions,
    ...solutionsComputed,

    isEditMode() {
      const idAsString = `${this.$route.params.id}`;
      return this.assignmentsEditState.includes(idAsString);
    },
  },

  async created() {
    if (this.solutionSent) {
      this.setSolutionSent(false);
      this.testing = true;

      bus.$on(EVENTS.PROGRAM_LOADED, this.onProgramLoaded);
    } else {
      await this.doFetch();
    }
  },

  destroyed() {
    bus.$off(EVENTS.PROGRAM_LOADED, this.onProgramLoaded);
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

    async doTests() {
      return new Promise((resolve) => {
        if (window.Worker) {
          const programToTest = EditorService.getProgram();
          const testWorker = new Worker('/test-worker.js');

          testWorker.postMessage({
            testsArray: this.assignment.tests,
            fileContent: programToTest,
          });

          testWorker.onmessage = async (message) => {
            const { programIsCorrect } = message.data;

            const solution = {
              assignmentId: this.assignment.id,
              isCorrect: programIsCorrect,
              program: programToTest,
            };
            await this.createSolution({ solution });

            resolve(programIsCorrect);
          };
        } else {
          // TODO: Graceful degragation, если нет воркеров.
        }
      });
    },

    async onProgramLoaded() {
      const ok = await this.doTests();

      if (ok) {
        bus.$emit(EVENTS.SHOW_TOAST, { message: 'Решение засчитано!' });
      } else {
        bus.$emit(EVENTS.SHOW_TOAST, {
          message: 'Решение неверно',
          isCorrect: false,
        });
      }

      this.testing = false;

      await this.onSolutionsFetch();
    },

    async onSolutionsFetch({ page = 1 } = {}) {
      const courseId = this.$route.params.courseId;
      const assignmentId = this.$route.params.id;

      await this.getSolutions({ courseId, assignmentId, page });
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
