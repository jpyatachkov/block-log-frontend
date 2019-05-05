<template>
  <course-container />
</template>

<script>
import CourseContainer from '@/components/CourseContainer';
import { MainFluidLayoutMixin } from '@/mixins';

export default {
  name: 'CourseCreate',

  components: {
    CourseContainer,
  },

  mixins: [MainFluidLayoutMixin],
};
</script>
