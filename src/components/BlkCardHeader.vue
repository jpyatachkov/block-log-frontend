<template>
  <div class="BlkCardHeader__container">
    <h2>
      <slot />
    </h2>

    <slot name="link-back" />
  </div>
</template>

<script>
export default {
  name: 'BlkCardHeader',
};
</script>

<style lang="scss" scoped>
.BlkCardHeader__container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
</style>
