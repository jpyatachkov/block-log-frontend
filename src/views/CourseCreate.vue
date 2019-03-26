<template>
  <course-container />
</template>

<script>
import CourseContainer from '@/components/CourseContainer';
import { EmptyLayoutMixin } from '@/mixins';

export default {
  name: 'CourseCreate',

  components: {
    CourseContainer,
  },

  mixins: [EmptyLayoutMixin],
};
</script>
