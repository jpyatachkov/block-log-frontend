<template>
  <blk-form @submit="onSubmit">
    <blk-input
    v-model.lazy="title"
    :errors="titleErrors"
    label="Название курса"
    />

    <blk-textarea
    v-model.lazy="description"
    :errors="descriptionErrors"
    label="Краткое описание"
    />

    <blk-form-buttons>
      <router-link
      v-if="update"
      :to="{ name: 'course', params: { id: course.id } }"
      class="mr-2"
      >
        К странице курса
      </router-link>
      <router-link
      v-else
      :to="{ name: 'my_courses' }"
      class="mr-2"
      >
        К моим курсам
      </router-link>

      <blk-button
      :disabled="loading"
      :loading="loading"
      type="submit"
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
import { coursesComputed } from '@/store/helpers';

export default {
  name: 'CourseForm',

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

  computed: {
    ...coursesComputed,

    titleErrors() {
      return this.getFieldErrors('title');
    },

    descriptionErrors() {
      return this.getFieldErrors('description');
    },
  },

  validators: {
    title: (v) => Validator.value(v).required(REQUIRED),
    description: (v) => Validator.value(v).required(REQUIRED),
  },
};
</script>
