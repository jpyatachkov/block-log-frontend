<template>
  <course-container update />
</template>

<script>
import CourseContainer from '@/components/CourseContainer';
import { EmptyLayoutMixin } from '@/mixins';

export default {
  name: 'CourseUpdate',

  components: {
    CourseContainer,
  },

  mixins: [EmptyLayoutMixin],
};
</script>
