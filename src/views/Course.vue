<template>
  <vs-row vs-w="12">
    <course-card
    :course="course"
    :preview="false"
    />

    <assignments-grid class="mt-2" />
  </vs-row>
</template>

<script>
import { coursesComputed, coursesMethods } from '@/store/helpers';

import AssignmentsGrid from '@/components/AssignmentsGrid';
import CourseCard from '@/components/CourseCard';

export default {
  name: 'Course',

  components: {
    AssignmentsGrid,
    CourseCard,
  },

  computed: {
    ...coursesComputed,
  },

  async mounted() {
    const courseId = this.$route.params.id;
    await this.getCourse({ courseId });
  },

  methods: {
    ...coursesMethods,
  },
};
</script>
