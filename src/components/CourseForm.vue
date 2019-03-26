<template>
  <blk-form @submit="onSubmit">
    <blk-input
    v-model.lazy="form.title"
    :errors="titleErrors"
    label="Название курса"
    />

    <blk-textarea
    v-model.lazy="form.description"
    :errors="descriptionErrors"
    label="Краткое описание"
    />

    <blk-form-buttons>
      <prev-page-link />

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
import PrevPageLink from './PrevPageLink';
import { REQUIRED } from '@/utils/validators/inputs';
import Validator from '@/utils/form-validator';

export default {
  name: 'CourseForm',

  components: {
    PrevPageLink,
  },

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
      title: '',
      description: '',
    },
  }),

  computed: {
    titleErrors() {
      return this.getFieldErrors('form.title');
    },

    descriptionErrors() {
      return this.getFieldErrors('form.description');
    },
  },

  validators: {
    'form.title': (v) => Validator.value(v).required(REQUIRED),
    'form.description': (v) => Validator.value(v).required(REQUIRED),
  },

  methods: {
    setFormData(form) {
      const { title, description } = form;

      this.form = {
        title,
        description,
      };
    },
  },
};
</script>
