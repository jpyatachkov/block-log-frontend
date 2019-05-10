<template>
  <div class="CourseProgress">
    <course-progress-navbar />

    <div class="container-fluid nopadding h-100">
      <div class="row nopadding h-100">
        <div class="col-3 nopadding">
          <course-progress-sidebar />
        </div>

        <div class="col-8 nopadding">
          <course-progress-assignment />
        </div>
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

import CourseProgressAssignment from '@/components/CourseProgressAssignment';
import CourseProgressNavbar from '@/components/CourseProgressNavbar';
import CourseProgressSidebar from '@/components/CourseProgressSidebar';

export default {
  name: 'CourseProgress',

  components: {
    CourseProgressAssignment,
    CourseProgressNavbar,
    CourseProgressSidebar,
  },

  mixins: [FetchResourceMixin, LoadingMixin, EmptyLayoutMixin],

  computed: {
    ...assignmentsComputed,
    ...coursesComputed,
    ...solutionsComputed,
  },

  async beforeRouteUpdate(to, from, next) {
    next();
    await this.doFetch();
  },

  methods: {
    ...assignmentsMethods,
    ...coursesMethods,
    ...solutionsMethods,

    async doFetch() {
      const courseId = this.$route.params.courseId;
      let assignmentId = parseInt(this.$route.params.id);

      await Promise.all([
        this.getCourse({ courseId }),
        this.getAssignments({ courseId, page: 1 }),
      ]);

      let idx;

      if (assignmentId) {
        idx = this.assignments.findIndex((value) => value.id === assignmentId);

        if (idx === -1) {
          idx = 0;
        }
      } else {
        idx = this.assignments.findIndex((value) => !value.passed);

        if (idx === -1) {
          idx = this.assignments.length - 1;
        }

        assignmentId = this.assignments[idx].id;
      }

      await Promise.all([
        this.getAssignment({ courseId, assignmentId }),
        this.getSolutions({ courseId, assignmentId }),
      ]);

      this.setAssignmentIndex({ idx });
    },
  },
};
</script>

<style lang="scss" scoped>
.CourseProgress {
  height: 100%;
  min-height: 100%;
}
</style>
