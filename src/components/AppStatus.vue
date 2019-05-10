<template>
  <img :src="imgSrc">
</template>

<script>
export default {
  name: 'AppStatus',

  props: {
    success: {
      required: true,
      type: Boolean,
    },
  },

  computed: {
    imgSrc() {
      return this.success
        ? require('@/assets/success.png')
        : require('@/assets/error.png');
    },
  },
};
</script>

<style lang="scss">
.AppStatus {
  &__container {
    width: 18px;
    height: 18px;
  }
}
</style>
