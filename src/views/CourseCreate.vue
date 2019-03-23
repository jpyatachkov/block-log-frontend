<template>
  <course-container />
</template>

<script>
import CourseContainer from '@/components/CourseContainer';
import { EmptyLayoutMixin } from '@/mixins';
import { coursesMethods } from '@/store/helpers';

export default {
  name: 'CourseCreate',

  components: {
    CourseContainer,
  },

  mixins: [EmptyLayoutMixin],

  created() {
    this.clearCourseForm();
  },

  methods: {
    ...coursesMethods,
  },
};
</script>
