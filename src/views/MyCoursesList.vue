<template>
  <courses-grid
  :courses="myCourses"
  :loading="loading"
  @fetch="doFetch"
  />
</template>

<script>
import { FetchResourceMixin, MainLayoutMixin } from '@/mixins';
import { coursesComputed, coursesMethods } from '@/store/helpers';

import CoursesGrid from '@/components/CoursesGrid';

export default {
  name: 'CourseList',

  components: {
    CoursesGrid,
  },

  mixins: [FetchResourceMixin, MainLayoutMixin],

  data: () => ({
    loading: false,
  }),

  computed: {
    ...coursesComputed,
  },

  methods: {
    ...coursesMethods,

    async doFetch({ page = 1 } = {}) {
      this.loading = true;
      await this.getMyCourses({ page });
      this.loading = false;
    },
  },
};
</script>
