<template>
  <items-grid
  :items="courses"
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

  computed: {
    ...coursesComputed,
  },

  methods: {
    ...coursesMethods,

    async onFetch({ page }) {
      await this.getCourses({ page });
    },
  },
};
</script>
