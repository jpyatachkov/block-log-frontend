<template>
  <div class="CourseAvatar__img-container">
    <img
    class="max-height-100 max-width-100"
    :src="imgSrc"
    >
  </div>
</template>

<script>
export default {
  name: 'CourseAvatar',

  props: {
    src: {
      default: null,
      validator: (v) => !v || v instanceof String || typeof v === 'string',
    },
  },

  computed: {
    imgSrc() {
      return this.src ? this.src : require('@/assets/default.png');
    },
  },
};
</script>

<style lang="scss">
.CourseAvatar {
  &__img-container {
    width: 120px;
    height: 120px;
  }
}
</style>
