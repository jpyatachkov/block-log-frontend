<template>
  <blk-button
  v-show="userCanCreateCourses"
  class="CourseCreateButton"
  round
  variant="light"
  @click="$router.push({ name: 'course_create' })"
  >
    Новый курс
  </blk-button>
</template>

<script>
import { accountComputed } from '@/store/helpers';

export default {
  name: 'CourseCreateButton',

  computed: {
    ...accountComputed,
  },
};
</script>

<style lang="scss" scoped>
.CourseCreateButton {
  color: #75bdf1;
}
</style>
