<template>
  <p>1</p>
  <!-- <vs-row vs-w="12">
    <course-card
    :course="course"
    :preview="false"
    />

    <assignments-grid class="mt-2" />
  </vs-row> -->
</template>

<script>
import { FetchResourceMixin, MainLayoutMixin } from '@/mixins';
import { coursesComputed, coursesMethods } from '@/store/helpers';

export default {
  name: 'Course',

  mixins: [FetchResourceMixin, MainLayoutMixin],

  computed: {
    ...coursesComputed,
  },

  methods: {
    ...coursesMethods,

    async doFetch() {
      const courseId = this.$route.params.id;
      await this.getCourse({ courseId });
    },
  },
};
</script>
