<template>
  <div class="container-fluid nopadding">
    <div class="row w-100">
      <div class="col">
        <h5>Пример результата работы программы</h5>
      </div>
    </div>

    <div class="row w-100 nopadding--row">
      <div
      class="col d-flex flex-column justify-content-start align-items-start nopadding--row"
      >
        <div class="d-flex align-items-center">
          <img
          :src="require('@/assets/input.png')"
          class="mr-2"
          >
          <b>Входные данные</b>
        </div>

        <div class="mt-2 TestExample__test">
          {{ inputs }}
        </div>
      </div>
    </div>

    <div class="row w-100 mt-3 nopadding--row">
      <div
      class="col d-flex flex-column justify-content-start align-items-start nopadding--row"
      >
        <div class="d-flex align-items-center">
          <img
          :src="require('@/assets/output.png')"
          class="mr-2"
          >
          <b>Выходные данные</b>
        </div>

        <div class="mt-2 TestExample__test">
          {{ outputs }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestExample',

  props: {
    test: {
      required: true,
      type: Object,
    },
  },

  computed: {
    inputs() {
      return this.test.inputArray ? this.test.inputArray.join(' ') : '';
    },

    outputs() {
      return this.test.outputArray ? this.test.outputArray.join(' ') : '';
    },
  },
};
</script>

<style lang="scss">
.TestExample {
  &__test {
    min-width: 100%;
    width: 100%;
    margin: none;
    padding-left: 5px;
    padding-right: 5px;
    color: white;
    background-color: #a1c5df;
  }
}
</style>
