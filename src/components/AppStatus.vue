<template>
  <div class="AppStatus__container">
    <img
    class="max-height-100 max-width-100"
    :src="imgSrc"
    >
  </div>
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
      console.log(this.success);
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
