<template>
  <course-container update />
</template>

<script>
import CourseContainer from '@/components/CourseContainer';
import { MainFluidLayoutMixin } from '@/mixins';

export default {
  name: 'CourseUpdate',

  components: {
    CourseContainer,
  },

  mixins: [MainFluidLayoutMixin],
};
</script>
