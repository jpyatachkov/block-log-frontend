<template>
  <div class="BlkLoader__container mt-4 mb-4">
    <b-spinner large />
  </div>
</template>

<script>
export default {
  name: 'BlkLoader',
};
</script>

<style lang="scss" scoped>
.BlkLoader__container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
