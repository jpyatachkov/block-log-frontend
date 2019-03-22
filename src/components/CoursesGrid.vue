<template>
  <blk-items-grid
  :items="courses"
  :loading="loading"
  @fetch="doFetch"
  >
    <template v-slot="{ item }">
      <course-card :course="item" />
    </template>
  </blk-items-grid>
</template>

<script>
import { coursesComputed, coursesMethods } from '@/store/helpers';

import BlkItemsGrid from './BlkItemsGrid';
import CourseCard from './CourseCard';
import { FetchResourceMixin } from '@/mixins';

export default {
  name: 'CourseGrid',

  components: {
    BlkItemsGrid,
    CourseCard,
  },

  mixins: [FetchResourceMixin],

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
      await this.getCourses({ page });
      this.loading = false;
    },
  },
};
</script>
