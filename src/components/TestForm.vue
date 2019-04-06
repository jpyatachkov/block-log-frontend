<template>
  <blk-form
  class="TestForm__container"
  @submit="onSubmit"
  >
    <blk-input
    v-model.lazy="form.inputArray"
    :errors="inputArrayErrors"
    class="TestForm__item mr-3"
    label="Исходные данные"
    placeholder="Вводите числа через пробел"
    @keypress="onKeyPress"
    />

    <blk-input
    v-model.lazy="form.outputArray"
    :errors="outputArrayErrors"
    class="TestForm__item mr-3"
    label="Ожидаемый результат"
    placeholder="Вводите числа через пробел"
    @keypress="onKeyPress"
    />

    <blk-button
    :disabled="loading"
    :loading="loading"
    class="TestForm__item--bottom"
    type="submit"
    round
    variant="success"
    >
      Добавить
    </blk-button>
  </blk-form>
</template>

<script>
import { FormValidationMixin } from '@/mixins';
import { REQUIRED } from '@/utils/validators/inputs';
import Validator from '@/utils/form-validator';

export default {
  name: 'TestForm',

  mixins: [FormValidationMixin],

  props: {
    loading: {
      default: false,
      type: Boolean,
    },
  },

  data: () => ({
    form: {
      inputArray: '',
      outputArray: '',
    },
  }),

  computed: {
    inputArrayErrors() {
      return this.getFieldErrors('form.inputArray');
    },

    outputArrayErrors() {
      return this.getFieldErrors('form.outputArray');
    },
  },

  validators: {
    'form.inputArray': (v) => Validator.value(v).required(REQUIRED),
    'form.outputArray': (v) => Validator.value(v).required(REQUIRED),
  },

  methods: {
    clear() {
      this.form.inputArray = '';
      this.form.outputArray = '';
      this.clearErrors();
    },

    onKeyPress(evt) {
      const { key } = evt;

      if (/[\d ]/.test(key)) {
        return true;
      }

      evt.preventDefault();
    },
  },
};
</script>

<style lang="scss" scoped>
.TestForm__container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
}

.TestForm__item {
  flex-grow: 1;
}
</style>
