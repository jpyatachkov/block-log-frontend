<template>
  <div class="width-100">
    <course-header
    :avatar="form.avatarBase64"
    :loading="loading"
    :title="form.title"
    class="mb-4"
    update
    />

    <blk-form @submit="onSubmit">
      <div class="container">
        <div
        class="row d-flex justify-items-start align-items-center mt-4 mb-4"
        >
          <div class="col">
            <blk-button
            :disabled="loading"
            :loading="loading"
            class="mr-3"
            type="submit"
            variant="success"
            >
              Сохранить
            </blk-button>

            <blk-button
            :disabled="loading"
            @click.prevent="$router.go(-1)"
            >
              Отмена
            </blk-button>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-md-8 mb-3">
            <blk-input
            v-model.lazy="form.title"
            :errors="titleErrors"
            label="Название курса"
            />

            <blk-textarea
            v-model.lazy="form.shortDescription"
            :errors="shortDescriptionErrors"
            :rows="3"
            class="p-0"
            hint="Краткое описание курса"
            label="О чем курс?"
            />

            <blk-textarea
            v-model.lazy="form.description"
            :errors="descriptionErrors"
            :rows="8"
            label="Описание курса"
            />

            <blk-input
            v-model.lazy="form.requirements"
            :errors="requirementsErrors"
            hint="Какими знаниями должны обладать ученики для прохождения курса"
            label="Требования"
            />
          </div>

          <div class="col-xs-12 col-md-4">
            <p class="mb-2">
              Обложка курса
            </p>

            <blk-alert
            :show="avatarNotUploaded"
            variant="danger"
            >
              Изображение курса не загружено
            </blk-alert>

            <blk-alert
            :show="avatarIncorrectFormat"
            variant="danger"
            >
              Неверный формат изображения курса
            </blk-alert>

            <app-form-file
            v-model="file"
            :state="avatarBase64Errors"
            accept=".jpg, .png"
            browse-text="Загрузить"
            class="mb-3"
            placeholder="Выберите файл..."
            drop-placeholder="Перетащите файл..."
            />

            <p class="mb-2">
              Сложность курса
            </p>

            <app-form-select
            v-model.lazy="form.complexity"
            :options="courseComplexityOptions"
            :state="complexityErrors"
            class="mb-3"
            />

            <app-checkbox v-model="form.isVisible">
              Курс видят другие пользователи
            </app-checkbox>
          </div>
        </div>
      </div>
    </blk-form>
  </div>
</template>

<script>
import { CourseComplexityMixin, FormValidationMixin } from '@/mixins';
import CourseHeader from './CourseHeader';
import { ImageService } from '@/services';
import { REQUIRED } from '@/utils/validators/inputs';
import Validator from '@/utils/form-validator';

export default {
  name: 'CourseForm',

  components: {
    CourseHeader,
  },

  mixins: [CourseComplexityMixin, FormValidationMixin],

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
    file: null,
    form: {
      title: '',
      shortDescription: '',
      description: '',
      avatarBase64: '',
      complexity: null,
      requirements: '',
      isVisible: false,
    },
  }),

  computed: {
    avatarNotUploaded() {
      return this.avatarBase64Errors === false && !this.file;
    },

    avatarIncorrectFormat() {
      return this.avatarBase64Errors === false && !!this.file;
    },

    titleErrors() {
      return this.getFieldErrors('form.title');
    },

    shortDescriptionErrors() {
      return this.getFieldErrors('form.shortDescription');
    },

    descriptionErrors() {
      return this.getFieldErrors('form.description');
    },

    requirementsErrors() {
      return this.getFieldErrors('form.requirements');
    },

    avatarBase64Errors() {
      return this.getFieldErrors('form.avatarBase64').length ? false : null;
    },

    complexityErrors() {
      return this.getFieldErrors('form.complexity').length ? false : null;
    },
  },

  watch: {
    async file() {
      this.form.avatarBase64 = await ImageService.resize(this.file);
    },
  },

  validators: {
    'form.title': (v) => Validator.value(v).required(REQUIRED),
    'form.shortDescription': (v) => Validator.value(v).required(REQUIRED),
    'form.description': (v) => Validator.value(v).required(REQUIRED),
    'form.requirements': (v) => Validator.value(v).required(REQUIRED),
    'form.avatarBase64': (v) => Validator.value(v).required(REQUIRED),
    'form.complexity': (v) => Validator.value(v).required(REQUIRED),
  },

  methods: {
    setFormData(form) {
      const {
        title,
        shortDescription,
        description,
        avatarBase64,
        complexity,
        requirements,
        isVisible,
      } = form;

      this.form = {
        title,
        shortDescription,
        description,
        avatarBase64,
        complexity,
        requirements,
        isVisible,
      };
    },
  },
};
</script>
