<template>
  <a
  href="#"
  class="mr-3"
  @click.prevent="$router.go(-1)"
  >Назад</a>
</template>

<script>
export default {
  name: 'PrevPageLink',
};
</script>
