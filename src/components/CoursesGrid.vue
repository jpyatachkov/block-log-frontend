<template>
  <items-grid
  :items="courses"
  :loading="loading"
  :total="coursesTotal"
  @fetch="onFetch"
  >
    <template v-slot:default="props">
      <course-card :course="props.item" />
    </template>
  </items-grid>
</template>

<script>
import { coursesComputed, coursesMethods } from '@/store/helpers';

import CourseCard from './CourseCard';
import ItemsGrid from './ItemsGrid';

export default {
  name: 'CoursesGrid',

  components: {
    CourseCard,
    ItemsGrid,
  },

  data: () => ({
    loading: false,
  }),

  computed: {
    ...coursesComputed,
  },

  methods: {
    ...coursesMethods,

    async onFetch({ page }) {
      this.loading = true;
      await this.getCourses({ page });
      this.loading = false;
    },
  },
};
</script>
