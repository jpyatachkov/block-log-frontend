<template>
  <div class="CourseProgressSidebar">
    <div
    v-for="(assignment, index) in assignments"
    :key="index"
    >
      <course-progress-sidebar-item
      :active="index === assignmentIndex"
      :assignment="assignment"
      :number="index"
      />
    </div>
  </div>
</template>

<script>
import {
  assignmentsComputed,
  assignmentsMethods,
  solutionsMethods,
} from '@/store/helpers';

import CourseProgressSidebarItem from './CourseProgressSidebarItem';

export default {
  name: 'CourseProgressSidebar',

  components: {
    CourseProgressSidebarItem,
  },

  data: () => ({
    active: null,
  }),

  computed: {
    ...assignmentsComputed,
  },

  methods: {
    ...assignmentsMethods,
    ...solutionsMethods,

    async onFetchAssignment({ idx, assignmentId }) {
      if (idx === this.currentIdx) {
        return;
      }

      this.setAssignmentCurrentIdx({ idx });
    },
  },
};
</script>

<style lang="scss" scoped>
.CourseProgressSidebar {
  background-color: #297ab5;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: 100%;
}
</style>
