<template>
  <div class="CourseProgressSidebar">
    <div
    v-for="(assignment, index) in assignments"
    :key="index"
    >
      <div class="CourseProgressAssignment mb-2">
        <div class="CourseProgressAssignment__number mr-3 pl-1 pr-2">
          {{ index }}
        </div>

        {{ assignment.title }}

        <div
        v-if="active"
        class="CourseProgressAssignment__triangle"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseProgressSidebar',

  props: {
    assignments: {
      required: true,
      type: Array,
    },
  },

  data: () => ({
    active: null,
  }),

  methods: {
    onCurrentAssignmentChanged(newAssignment) {
      this.active = newAssignment;
      this.$emit('fetch-assignment', this.assignments[newAssignment].id);
    },
  },
};
</script>

<style lang="scss" scoped>
.CourseProgressSidebar {
  background-color: #297ab5;
  display: flex;
  flex-direction: column;
}

.CourseProgressAssignment {
  display: flex;
  color: white;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;

  &--active {
    background-color: #24be74;
  }

  &__number {
    background-color: white;
    color: black;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  &__triangle {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;

    border-right: 10px solid white;
  }
}
</style>
