<template>
  <course-container update />
</template>

<script>
import { EmptyLayoutMixin, FetchResourceMixin } from '@/mixins';

import CourseContainer from '@/components/CourseContainer';
import { coursesMethods } from '@/store/helpers';

export default {
  name: 'CourseUpdate',

  components: {
    CourseContainer,
  },

  mixins: [EmptyLayoutMixin, FetchResourceMixin],

  methods: {
    ...coursesMethods,

    async doFetch() {
      const courseId = this.$route.params.id;
      await this.fillCourseForm({ courseId });
    },
  },
};
</script>
