<template>
  <div class="BlkCardActions__container">
    <slot
    class="BlkCardActions__block--left"
    name="left"
    />

    <slot class="BlkCardActions__block--right" />
  </div>
</template>

<script>
export default {
  name: 'BlkCardActions',
};
</script>

<style lang="scss" scoped>
.BlkCardActions__container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

.BlkCardActions__block--left {
  align-self: flex-start;
}

.BlkCardActions__block--right {
  align-self: flex-end;
}
</style>
