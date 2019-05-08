<template>
  <div class="container CourseAssignmentsList__container">
    <course-assignments-list-header
    :show-add-button="!showAddForm"
    @add-assignment="showAddForm = true"
    />

    <assignment-container
    v-if="showAddForm"
    @hide="showAddForm = false"
    />

    <course-assignments-list-items
    :loading="loading"
    @fetch-assignments="doFetch"
    />
  </div>
</template>

<script>
import { FetchResourceMixin, LoadingMixin } from '@/mixins';

import AssignmentContainer from '@/components/AssignmentContainer';
import CourseAssignmentsListHeader from '@/components/CourseAssignmentsListHeader';
import CourseAssignmentsListItems from '@/components/CourseAssignmentsListItems';
import { assignmentsMethods } from '@/store/helpers';

export default {
  name: 'CourseAssignmentsList',

  components: {
    AssignmentContainer,
    CourseAssignmentsListHeader,
    CourseAssignmentsListItems,
  },

  mixins: [FetchResourceMixin, LoadingMixin],

  data: () => ({
    showAddForm: false,
  }),

  methods: {
    ...assignmentsMethods,

    async doFetch({ page = 1 } = {}) {
      this.setLoading(true);

      const courseId = this.$route.params.id;
      await this.getAssignments({ courseId, page });

      this.setLoading(false);
    },
  },
};
</script>

<style lang="scss">
.CourseAssignmentsList {
  &__container {
    margin-top: 35px;
  }
}
</style>
