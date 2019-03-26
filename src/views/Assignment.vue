<template>
  <assignment-card
  :assignment="assignment"
  :preview="false"
  />
</template>

<script>
import { FetchResourceMixin, MainLayoutMixin } from '@/mixins';
import {
  assignmentsComputed,
  assignmentsMethods,
  coursesMethods,
} from '@/store/helpers';

import AssignmentCard from '@/components/AssignmentCard';

export default {
  name: 'Assignment',

  components: {
    AssignmentCard,
  },

  mixins: [FetchResourceMixin, MainLayoutMixin],

  computed: {
    ...assignmentsComputed,
  },

  methods: {
    ...assignmentsMethods,
    ...coursesMethods,

    async doFetch() {
      const courseId = this.$route.params.courseId;
      const assignmentId = this.$route.params.id;

      await this.getCourse({ courseId });
      await this.getAssignment({ courseId, assignmentId });
    },
  },
};
</script>
