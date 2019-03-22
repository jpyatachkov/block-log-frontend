<template>
  <div class="BlkFormButtons__container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BlkFormButtons',
};
</script>

<style lang="scss" scoped>
.BlkFormButtons__container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
}
</style>
