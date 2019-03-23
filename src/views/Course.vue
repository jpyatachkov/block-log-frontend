<template>
  <div>
    <course-card
    :course="course"
    :preview="false"
    />

    <assignments-grid
    :assignments="assignments"
    :loading="loading"
    class="mt-3 mb-3"
    @fetch="doFetchAssignments"
    />
  </div>
</template>

<script>
import { FetchResourceMixin, MainLayoutMixin } from '@/mixins';
import {
  assignmentsComputed,
  assignmentsMethods,
  coursesComputed,
  coursesMethods,
} from '@/store/helpers';

import AssignmentsGrid from '@/components/AssignmentsGrid';
import CourseCard from '@/components/CourseCard';

export default {
  name: 'Course',

  components: {
    AssignmentsGrid,
    CourseCard,
  },

  mixins: [FetchResourceMixin, MainLayoutMixin],

  data: () => ({
    loading: false,
  }),

  computed: {
    ...assignmentsComputed,
    ...coursesComputed,
  },

  created() {
    this.clearAssignments();
  },

  methods: {
    ...assignmentsMethods,
    ...coursesMethods,

    async doFetch() {
      const courseId = this.$route.params.id;
      await this.getCourse({ courseId });

      await this.doFetchAssignments();
    },

    async doFetchAssignments({ page = 1 } = {}) {
      const courseId = this.course.id;

      this.loading = true;
      await this.getAssignments({ courseId, page });
      this.loading = false;
    },
  },
};
</script>
