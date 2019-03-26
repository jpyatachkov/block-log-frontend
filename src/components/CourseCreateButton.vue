<template>
  <blk-button
  v-show="show"
  round
  variant="primary"
  @click="$router.push({ name: 'course_create' })"
  >
    Новый курс
  </blk-button>
</template>

<script>
import { AccountService } from '@/services';

export default {
  name: 'CourseCreateButton',

  computed: {
    show() {
      return (
        AccountService.userCanCreateCourses() &&
        (this.$route.name === 'courses' || this.$route.name === 'my_courses')
      );
    },
  },
};
</script>

<style></style>
