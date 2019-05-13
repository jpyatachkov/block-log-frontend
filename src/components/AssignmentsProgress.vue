<template>
  <b-progress
  height="27px"
  :max="100"
  show-value
  >
    <b-progress-bar
    :label="`${passedPercent}`"
    :value="passedPercent"
    variant="success"
    />
    <b-progress-bar
    v-if="willPassPercent"
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
      const passed =
        this.course.countPassed === this.course.countAssignments
          ? 0
          : this.course.countPassed + 1;

      if (passed) {
        const percent = Math.round(
          (passed / this.course.countAssignments) * 100,
        );
        return this.userIsEnrolled && this.course.countAssignments
          ? percent - this.passedPercent
          : 0;
      } else {
        return 0;
      }
    },
  },
};
</script>
