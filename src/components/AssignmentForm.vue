<template>
  <blk-form @submit="onSubmit">
    <blk-textarea
    v-model.lazy="form.text"
    :errors="textErrors"
    label="Краткое описание"
    />

    <blk-form-buttons>
      <blk-button
      :disabled="loading"
      :loading="loading"
      type="submit"
      round
      variant="primary"
      >
        Сохранить
      </blk-button>
    </blk-form-buttons>
  </blk-form>
</template>

<script>
import { FormValidationMixin } from '@/mixins';
import { REQUIRED } from '@/utils/validators/inputs';
import Validator from '@/utils/form-validator';
import { assignmentsMethods } from '@/store/helpers';

export default {
  name: 'AssignmentForm',

  mixins: [FormValidationMixin],

  props: {
    loading: {
      default: false,
      type: Boolean,
    },
    update: {
      default: false,
      type: Boolean,
    },
  },

  data: () => ({
    form: {
      text: '',
    },
  }),

  computed: {
    textErrors() {
      return this.getFieldErrors('form.text');
    },
  },

  validators: {
    'form.text': (v) => Validator.value(v).required(REQUIRED),
  },

  methods: {
    ...assignmentsMethods,

    setFormData(form) {
      const { text } = form;

      this.form = {
        text,
      };
    },
  },
};
</script>
