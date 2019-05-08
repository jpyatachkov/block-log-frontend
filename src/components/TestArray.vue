<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <blk-input
        :value="value.inputArray"
        label="Исходные данные"
        disabled
        />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <blk-input
        :value="value.outputArray"
        label="Ожидаемый результат"
        disabled
        />
      </div>
    </div>

    <div class="row">
      <div class="col d-flex justify-content-end align-items-center">
        <div
        v-if="deletable"
        class="TestArray__header"
        >
          <blk-button
          :disabled="loading"
          :loading="loading"
          variant="outline-danger"
          @click="$emit('delete', { index })"
          >
            Удалить
          </blk-button>
        </div>
      </div>
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
