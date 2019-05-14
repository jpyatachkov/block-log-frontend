<template>
  <div class="CourseProgress">
    <course-progress-navbar />

    <div class="container-fluid nopadding h-100">
      <div class="row nopadding h-100">
        <div class="col-2 nopadding">
          <course-progress-sidebar />
        </div>

        <div class="col-10 nopadding">
          <content-placeholders
          v-if="solutionSent || loading"
          class="m-3"
          >
            <content-placeholders-heading />
            <content-placeholders-text :lines="3" />
          </content-placeholders>
          <course-progress-assignment v-else />
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
    console.log('BRU');
    next();
    await this.doFetch();
  },

  methods: {
    ...assignmentsMethods,
    ...coursesMethods,
    ...solutionsMethods,

    async doFetch() {
      console.log('DF');
      this.setLoading(true);

      const courseId = this.$route.params.courseId;
      let assignmentId = parseInt(this.$route.params.id);

      await Promise.all([
        this.getCourse({ courseId }),
        this.getAssignments({ courseId, page: 1 }),
      ]);

      let idx;

      if (assignmentId === -1) {
        idx = this.assignments.findIndex((value) => value.passed !== true);

        if (idx === -1) {
          idx = this.assignments.length - 1;
        }

        assignmentId = this.assignments[idx].id;

        this.$router.replace({
          name: 'course_progress',
          params: { courseId, id: assignmentId },
        });

        return;
      }

      assignmentId = parseInt(assignmentId);

      idx = this.assignments.findIndex((value) => value.id === assignmentId);

      if (idx === -1) {
        idx = 0;
      }

      this.setAssignmentIndex({ idx });

      this.clearSolutions();

      console.log(1);

      await this.getAssignment({ courseId, assignmentId });
      await this.getSolutions({ courseId, assignmentId, page: 1 });

      this.setLoading(false);
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
