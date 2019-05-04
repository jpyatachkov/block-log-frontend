<template>
  <b-progress
  height="17px"
  show-value
  >
    <b-progress-bar
    :label="`${passedPercent}`"
    :value="passedPercent"
    variant="success"
    />
    <b-progress-bar
    :value="willPassPercent"
    variant="warning"
    />
  </b-progress>
</template>

<script>
import { coursesComputed } from '@/store/helpers';

export default {
  name: 'AssignmentsProgress',

  computed: {
    ...coursesComputed,

    passedPercent() {
      return this.course.countAssignments
        ? Math.round(
          (this.course.countPassed / this.course.countAssignments) * 100,
        )
        : 0;
    },

    /**
     * Значение на 1 больше, чем процент пройденных заданий.
     */
    willPassPercent() {
      return this.userIsEnrolled && this.course.countAssignments
        ? Math.round(
          ((this.course.countPassed + 1) / this.course.countAssignments) *
            100,
        )
        : 0;
    },
  },
};
</script>
