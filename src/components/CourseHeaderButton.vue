<template>
  <div class="d-flex justify-content-center align-items-center">
    <div v-if="!update && hasAssignments">
      <blk-button
      v-if="userIsEnrolled"
      :disabled="loading"
      :loading="loading"
      variant="success"
      @click="onGoOn"
      >
        {{ goOnButtonText }}
      </blk-button>
      <blk-button
      v-else
      :disabled="loading"
      :loading="loading"
      variant="success"
      @click="onEnroll"
      >
        {{ enrollButtonText }}
      </blk-button>
    </div>

    <b-dropdown
    v-if="userIsModerator && !update"
    class="ml-1"
    right
    variant="light"
    >
      <b-dropdown-item @click="showConfirmDialog = true">
        Удалить курс
      </b-dropdown-item>
    </b-dropdown>

    <b-modal
    v-model="showConfirmDialog"
    busy
    centered
    title="Удалить курс?"
    >
      <p class="my-4">
        Это действие приведет к безвозвратному удалению курса. Вы уверены?
      </p>

      <blk-form-buttons slot="modal-footer">
        <blk-button
        :disabled="loading"
        class="mr-2"
        @click="showConfirmDialog = false"
        >
          Отмена
        </blk-button>

        <blk-button
        :disabled="loading"
        :loading="loading"
        variant="danger"
        @click="onDelete"
        >
          Удалить
        </blk-button>
      </blk-form-buttons>
    </b-modal>
  </div>
</template>

<script>
import {
  accountComputed,
  assignmentsComputed,
  coursesComputed,
  coursesMethods,
} from '@/store/helpers';
import eventBus, { EVENTS } from '@/bus';

import { LoadingMixin } from '@/mixins';

export default {
  name: 'CourseHeaderButton',

  mixins: [LoadingMixin],

  props: {
    update: {
      required: true,
      type: Boolean,
    },
  },

  data: () => ({
    showConfirmDialog: false,
  }),

  computed: {
    ...accountComputed,
    ...assignmentsComputed,
    ...coursesComputed,

    enrollButtonText() {
      return this.userCanCreateCourses ? 'Преподавать курс' : 'Пройти курс';
    },

    goOnButtonText() {
      return 'Продолжить';
    },

    hasAssignments() {
      return !!(this.assignments || []).length;
    },

    userCanCreateAssignments() {
      return this.userIsCollaborator || this.userIsModerator;
    },
  },

  methods: {
    ...coursesMethods,

    async onEnroll() {
      const courseId = this.$route.params.id;

      this.setLoading(true);

      await this.enrollCourse({ courseId });
      // Нужно для того, чтобы список курсов обновился.
      // Если этого не сделать, то при переходе на страницу моих курсов или курсов в целом
      // не будет запроса к API (т.к. мы кэшируем извлеченные данные, чтобы не делать лишних запросов),
      // соответственно, нужно будет обновлять страницу вручную, чтобы увидеть созданный курс.
      this.clearMyCourses();

      this.setLoading(false);
      eventBus.$emit(EVENTS.SHOW_TOAST, { message: 'Вы записаны на курс' });
    },

    onGoOn() {
      this.$router.push({
        name: 'course_progress',
        params: { courseId: this.course.id, id: -1 },
      });
    },

    async onDelete() {
      const courseId = this.$route.params.id;

      this.setLoading(true);

      await this.deleteCourse({ courseId });
      // Нужно для того, чтобы список курсов обновился.
      // Если этого не сделать, то при переходе на страницу моих курсов или курсов в целом
      // не будет запроса к API (т.к. мы кэшируем извлеченные данные, чтобы не делать лишних запросов),
      // соответственно, нужно будет обновлять страницу вручную, чтобы увидеть созданный курс.
      this.clearCourses();
      this.clearMyCourses();

      this.setLoading(false);

      this.showConfirmDialog = false;
      this.$router.push({ name: 'my_courses' });
      eventBus.$emit(EVENTS.SHOW_TOAST, { message: 'Курс удален' });
    },
  },
};
</script>
