<template>
  <courses-grid />
</template>

<script>
import CoursesGrid from '@/components/CoursesGrid';
import { MainLayoutMixin } from '@/mixins';

export default {
  name: 'CourseList',

  components: {
    CoursesGrid,
  },

  mixins: [MainLayoutMixin],
};
</script>
