<template>
  <div class="Home__container height-100">
    <img
    class="mt-1 mb-3 pointer"
    src="@/assets/logo.png"
    @click="$router.push({ name: 'my_courses' })"
    >
    <h2>BlockLog</h2>
  </div>
</template>

<script>
import { EmptyLayoutMixin } from '@/mixins';

export default {
  name: 'Home',

  mixins: [EmptyLayoutMixin],
};
</script>

<style lang="scss" scoped>
.Home__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
