<template>
  <div>
    <course-progress-navbar />

    <div>
      <div class="row">
        <div class="col-3">
          <course-progress-sidebar :assignments="assignments" />
        </div>

        <div class="col-8" />
      </div>
    </div>
  </div>
</template>

<script>
import { EmptyLayoutMixin, FetchResourceMixin, LoadingMixin } from '@/mixins';
import {
  assignmentsComputed,
  assignmentsMethods,
  coursesComputed,
  coursesMethods,
  solutionsComputed,
  solutionsMethods,
} from '@/store/helpers';

import CourseProgressNavbar from '@/components/CourseProgressNavbar';
import CourseProgressSidebar from '@/components/CourseProgressSidebar';

export default {
  name: 'CourseProgress',

  components: {
    CourseProgressNavbar,
    CourseProgressSidebar,
  },

  mixins: [FetchResourceMixin, LoadingMixin, EmptyLayoutMixin],

  computed: {
    ...assignmentsComputed,
    ...coursesComputed,
    ...solutionsComputed,
  },

  methods: {
    ...assignmentsMethods,
    ...coursesMethods,
    ...solutionsMethods,

    async doFetch() {
      const courseId = this.$route.params.id;

      await Promise.all([
        this.getCourse({ courseId }),
        this.getAssignments({ courseId, page: 1, size: 100 }), // TODO: Пагинация списка заданий.
      ]);
    },

    async onFetchAssignment(assignmentId) {
      const courseId = this.$route.params.id;

      await Promise.all([
        this.getAssignment({ courseId, assignmentId }),
        this.onFetchSolutions({ assignmentId }),
      ]);
    },

    async onFetchSolutions({ assignmentId, page = 1 }) {
      const courseId = this.$route.params.id;
      await this.getSolutions({ courseId, assignmentId });
    },
  },
};
</script>
