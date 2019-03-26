<template>
  <div>
    <course-card
    :course="course"
    :preview="false"
    @edit="editMode = $event"
    />

    <course-edit-card
    v-if="editMode"
    class="mt-3 mb-3"
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
import { FetchResourceMixin, LoadingMixin, MainLayoutMixin } from '@/mixins';
import {
  assignmentsComputed,
  assignmentsMethods,
  coursesComputed,
  coursesMethods,
} from '@/store/helpers';

import AssignmentsGrid from '@/components/AssignmentsGrid';
import CourseCard from '@/components/CourseCard';
import CourseEditCard from '@/components/CourseEditCard';

export default {
  name: 'Course',

  components: {
    AssignmentsGrid,
    CourseCard,
    CourseEditCard,
  },

  mixins: [FetchResourceMixin, LoadingMixin, MainLayoutMixin],

  data: () => ({
    editMode: false,
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

      this.setLoading(true);
      await this.getAssignments({ courseId, page });
      this.setLoading(false);
    },
  },
};
</script>
