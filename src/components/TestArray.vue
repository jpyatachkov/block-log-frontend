<template>
  <div class="TestArray__container">
    <div
    v-if="deletable"
    class="TestArray__header"
    >
      <blk-button
      :disabled="loading"
      :loading="loading"
      round
      variant="outline-danger"
      @click="$emit('delete', { index })"
      >
        Удалить
      </blk-button>
    </div>

    <div class="TestArray__content">
      <p>Исходные данные: {{ value.inputArray }}</p>
      <p>Ожидаемый результат: {{ value.outputArray }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestArray',

  props: {
    deletable: {
      default: false,
      type: Boolean,
    },
    index: {
      required: true,
      type: Number,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    value: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.TestArray__header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.TestArray__content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}

.TestArray__items {
  display: flex;
  flex-direction: column;
}
</style>
