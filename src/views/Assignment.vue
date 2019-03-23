<template>
  <assignment-card
  :assignment="assignment"
  :preview="false"
  />
</template>

<script>
import { FetchResourceMixin, MainLayoutMixin } from '@/mixins';
import { assignmentsComputed, assignmentsMethods } from '@/store/helpers';

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

    async doFetch() {
      const courseId = this.$route.params.courseId;
      const assignmentId = this.$route.params.id;

      await this.getAssignment({ courseId, assignmentId });
    },
  },
};
</script>
