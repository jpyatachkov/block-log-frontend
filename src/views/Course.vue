<template>
  <div>
    <course-header
    :avatar="course.avatarBase64"
    :title="course.title"
    class="mb-4"
    @nav-changed="currentNav = $event"
    />

    <div class="container">
      <course-info v-if="currentNav === 0" />

      <course-assignments
      v-if="currentNav === 1"
      :loading="loading"
      @fetch-assignments="onFetchAssignments"
      />
    </div>
  </div>
</template>

<script>
import {
  FetchResourceMixin,
  LoadingMixin,
  MainFluidLayoutMixin,
} from '@/mixins';
import {
  assignmentsMethods,
  coursesComputed,
  coursesMethods,
} from '@/store/helpers';

import CourseAssignments from '@/components/CourseAssignments';
import CourseHeader from '@/components/CourseHeader';
import CourseInfo from '@/components/CourseInfo';

export default {
  name: 'Course',

  components: {
    CourseAssignments,
    CourseHeader,
    CourseInfo,
  },

  mixins: [FetchResourceMixin, LoadingMixin, MainFluidLayoutMixin],

  props: {
    nav: {
      default: 0,
      type: Number,
    },
  },

  data: () => ({
    currentNav: 0,
  }),

  computed: {
    ...coursesComputed,
  },

  created() {
    this.currentNav = this.nav || this.currentNav;
    this.clearAssignments();
  },

  methods: {
    ...assignmentsMethods,
    ...coursesMethods,

    // changeEditState(isEditMode) {
    //   const id = `${this.$route.params.id}`;
    //   this.changeCoursesEditState({ id, isEditMode });
    // },

    async doFetch() {
      const courseId = this.$route.params.id;
      await this.getCourse({ courseId });

      await this.onFetchAssignments();
    },

    async onFetchAssignments({ page = 1 } = {}) {
      const courseId = this.$route.params.id;

      this.setLoading(true);
      await this.getAssignments({ courseId, page });
      this.setLoading(false);
    },
  },
};
</script>
