<template>
  <blk-form
  @submit="
    onSubmit();
    clearAutosavedData();
  "
  >
    <div class="container">
      <div class="row">
        <div class="col">
          <blk-input
          v-model.lazy="form.title"
          :errors="titleErrors"
          label="Заголовок задания"
          />

          <blk-textarea
          v-model.lazy="form.description"
          :errors="descriptionErrors"
          label="Условие"
          />

          <!-- <blk-button
          :disabled="loading"
          :loading="loading"
          round
          variant="outline-primary"
          @click.prevent="onRedirectToEditor"
          >
            {{ update ? 'Обновить' : 'Создать' }} шаблон решения
          </blk-button> -->
        </div>
      </div>

      <div class="row">
        <hr class="col">
      </div>

      <div class="row">
        <div class="col">
          <div class="row">
            <div class="col d-flex justify-content-start align-items-center">
              <h5>Тестовые данные</h5>
            </div>

            <div class="col d-flex justify-content-end align-items-center">
              <div
              class="AssignmentForm__img-container mr-2 d-flex justify-content-center align-items-center"
              >
                <img
                class="w-100 h-100"
                :src="require('@/assets/attention.png')"
                >
              </div>

              <h6>Формат тестовых данных - через пробел.</h6>
            </div>
          </div>

          <div
          v-for="(_, index) in form.tests"
          :key="index"
          class="mt-3"
          >
            <h6>Тест {{ index + 1 }}</h6>

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
        </div>
      </div>

      <div class="row">
        <hr class="col">
      </div>

      <div class="row">
        <div class="col d-flex jusify-content-start align-items-end">
          <blk-button
          :disabled="loading"
          class="mr-2"
          @click="onCancelClick"
          >
            Отмена
          </blk-button>

          <blk-button
          :disabled="loading"
          :loading="loading"
          type="submit"
          variant="primary"
          >
            Сохранить
          </blk-button>
        </div>
      </div>
    </div>
  </blk-form>
</template>

<script>
import { assignmentsComputed, assignmentsMethods } from '@/store/helpers';

import { EditorService } from '@/services';
import { FormValidationMixin } from '@/mixins';
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

    onCancelClick() {
      this.clearAutosavedData();
      this.clearEditor();
      this.$emit('close-edit-mode');
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
        tests = [];
      } else {
        tests = tests.map((test) => ({
          inputArray: test.inputArray.map((x) => `${x}`).join(' '),
          outputArray: test.outputArray.map((x) => `${x}`).join(' '),
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

<style lang="scss">
.AssignmentForm {
  &__img-container {
    height: 20px;
    width: 20px;
  }
}
</style>
