<template>
  <a
  href="#"
  class="mr-3"
  @click.prevent="onClick"
  >Назад</a>
</template>

<script>
export default {
  name: 'PrevPageLink',

  methods: {
    onClick() {
      this.$router.go(-1);
      this.$emit('click');
    },
  },
};
</script>
