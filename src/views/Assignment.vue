<template>
  <div>
    <assignment-card
    :assignment="assignment"
    :preview="false"
    @edit="editMode = $event"
    />

    <assignment-edit-card
    v-if="editMode"
    class="mt-3 mb-3"
    />
  </div>
</template>

<script>
import { FetchResourceMixin, MainLayoutMixin } from '@/mixins';
import {
  assignmentsComputed,
  assignmentsMethods,
  coursesMethods,
} from '@/store/helpers';

import AssignmentCard from '@/components/AssignmentCard';
import AssignmentEditCard from '@/components/AssignmentEditCard';

export default {
  name: 'Assignment',

  components: {
    AssignmentCard,
    AssignmentEditCard,
  },

  mixins: [FetchResourceMixin, MainLayoutMixin],

  data: () => ({
    editMode: false,
  }),

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
