<template>
  <div>
    <course-card
    :course="course"
    :preview="false"
    @edit="changeEditState"
    />

    <course-edit-card
    v-if="isEditMode"
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

    isEditMode() {
      const idAsString = `${this.$route.params.id}`;
      return this.coursesEditState.includes(idAsString);
    },
  },

  created() {
    this.clearAssignments();
  },

  methods: {
    ...assignmentsMethods,
    ...coursesMethods,

    changeEditState(isEditMode) {
      const id = this.$route.params.id;
      this.changeCoursesEditState({ id, isEditMode });
    },

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
