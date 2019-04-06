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

    <div
    v-for="(_, index) in form.tests"
    :key="index"
    class="mt-3"
    >
      <h5>Тест {{ index + 1 }}</h5>
      <test-array
      v-model="form.tests[index]"
      :index="index"
      class="mt-2"
      deletable
      @delete="onDeleteTest"
      />
    </div>

    <test-form
    ref="testForm"
    class="mt-3"
    @submit="onAddTest"
    />

    <blk-form-buttons class="mt-2 mb-2">
      <prev-page-link
      @click="
        clearAutosavedData();
        clearEditor();
      "
      />

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
import { assignmentsComputed, assignmentsMethods } from '@/store/helpers';

import { EditorService } from '@/services';
import { FormValidationMixin } from '@/mixins';
import PrevPageLink from './PrevPageLink';
import { REQUIRED } from '@/utils/validators/inputs';
import TestArray from './TestArray';
import TestForm from './TestForm';
import Validator from '@/utils/form-validator';
import { deleteByIndex } from '@/utils/helpers';

export function buildEmptyTest() {
  return {
    inputArray: '',
    outputArray: '',
  };
}

export default {
  name: 'AssignmentForm',

  components: {
    PrevPageLink,
    TestArray,
    TestForm,
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
      tests: [],
    },
  }),

  computed: {
    ...assignmentsComputed,

    titleErrors() {
      return this.getFieldErrors('form.title');
    },

    descriptionErrors() {
      return this.getFieldErrors('form.description');
    },

    lastTestIsFilled() {
      const lastTest = this.form.tests[this.form.tests.length - 1];
      return !!lastTest.inputArray.length && !!lastTest.outputArray.length;
    },
  },

  created() {
    if (!this.assignmentFormVisited && !this.update) {
      EditorService.clearEditorContent();
    }

    this.setAssignmentFormVisited(true);
  },

  validators: {
    'form.title': (v) => Validator.value(v).required(REQUIRED),
    'form.description': (v) => Validator.value(v).required(REQUIRED),
  },

  methods: {
    ...assignmentsMethods,

    clearAutosavedData() {
      this.clearAssignmentForm();
      this.setAssignmentFormVisited(false);
    },

    clearEditor() {
      EditorService.clearEditorContent();
    },

    onAddTest(formData) {
      this.form.tests.push(formData);
      this.$refs.testForm.clear();
    },

    onDeleteTest({ index }) {
      deleteByIndex(this.form.tests, index);
    },

    onRedirectToEditor() {
      this.setAssignmentForm(this.form);

      EditorService.setButtonText('Сохранить шаблон')
        .setProgram(this.form.program)
        .setRedirectURL(this.$route.fullPath)
        .openEditor();
    },

    setFormData(form) {
      let { title, description, program, tests } = form;

      if (!tests || !tests.length) {
        tests = [buildEmptyTest()];
      } else {
        tests = tests.map((test) => ({
          inputArray: test.inputArray.join(' '),
          outputArray: test.outputArray.join(' '),
        }));
      }

      this.form = {
        title,
        description,
        program,
        tests,
      };
    },
  },
};
</script>
