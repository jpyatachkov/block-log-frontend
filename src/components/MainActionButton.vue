<template>
  <blk-button
  v-show="show"
  round
  variant="primary"
  @click="onClick"
  >
    {{ text }}
  </blk-button>
</template>

<script>
import { AccountService } from '@/services';

export default {
  name: 'MainActionButton',

  computed: {
    show() {
      switch (true) {
        case this.$route.name === 'courses' &&
          AccountService.userCanCreateAndDelete():
        case this.$route.name === 'my_courses' &&
          AccountService.userCanCreateAndDelete():
        case this.$route.name === 'course' && AccountService.userCanUpdate():
        case this.$route.name === 'assignment' &&
          AccountService.userCanUpdate():
          return true;
        default:
          return false;
      }
    },

    text() {
      switch (true) {
        case this.$route.name === 'courses' &&
          AccountService.userCanCreateAndDelete():
        case this.$route.name === 'my_courses' &&
          AccountService.userCanCreateAndDelete():
          return 'Создать курс';
        case this.$route.name === 'course' && AccountService.userCanUpdate():
          return 'Редактировать курс';
        case this.$route.name === 'assignment' &&
          AccountService.userCanUpdate():
          return 'Редактировать задание';
        default:
          return '';
      }
    },
  },

  methods: {
    onClick() {
      switch (true) {
        case this.$route.name === 'courses' &&
          AccountService.userCanCreateAndDelete():
        case this.$route.name === 'my_courses' &&
          AccountService.userCanCreateAndDelete():
          this.$router.push({ name: 'course_create' });
          break;
        default:
          break;
      }
    },
  },
};
</script>
