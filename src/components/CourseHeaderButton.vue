<template>
  <blk-button
  variant="success"
  @click="onClick"
  >
    Пройти курс
  </blk-button>
</template>

<script>
export default {
  name: 'CourseHeaderButton',

  methods: {
    onClick() {
      console.log('ENROLL');
    },
  },
};
</script>
