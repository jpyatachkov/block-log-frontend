<template>
  <blk-form
  @submit="
    onSubmit();
    clearAutosavedData();
  "
  >
    <blk-input
    v-model.lazy="form.title"
    :errors="titleErrors"
    label="Название задания"
    />

    <blk-textarea
    v-model.lazy="form.description"
    :errors="descriptionErrors"
    label="Текст задания"
    />

    <blk-button
    :disabled="loading"
    :loading="loading"
    round
    variant="outline-primary"
    @click.prevent="onRedirectToEditor"
    >
      {{ update ? 'Обновить' : 'Создать' }} шаблон решения
    </blk-button>

    <blk-form-buttons class="mt-2">
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
import { EditorService } from '@/services';
import { FormValidationMixin } from '@/mixins';
import PrevPageLink from './PrevPageLink';
import { REQUIRED } from '@/utils/validators/inputs';
import Validator from '@/utils/form-validator';
import { assignmentsMethods } from '@/store/helpers';

export default {
  name: 'AssignmentForm',

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
      program: null,
      inputs: [''],
      outputs: [''],
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
    ...assignmentsMethods,

    clearAutosavedData() {
      this.clearAssignmentForm();
    },

    onRedirectToEditor() {
      this.setAssignmentForm(this.form);

      EditorService.setButtonText('Сохранить шаблон');
      EditorService.setProgram(this.form.program);
      EditorService.setRedirectURL(this.$route.fullPath);
      EditorService.openEditor();
    },

    setFormData(form) {
      const { title, description, program, inputs, outputs } = form;

      this.form = {
        title,
        description,
        program,
        inputs,
        outputs,
      };
    },
  },
};
</script>
