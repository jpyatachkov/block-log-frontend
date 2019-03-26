<template>
  <blk-card>
    <b-row>
      <b-col
      class="mt-2 mb-2"
      xs="12"
      md="4"
      >
        <blk-button
        block
        class="mr-2"
        round
        variant="primary"
        @click="onEditClick"
        >
          Редактировать курс
        </blk-button>
      </b-col>

      <b-col
      class="mt-2 mb-2"
      xs="12"
      md="4"
      >
        <blk-button
        block
        class="mr-2"
        round
        variant="success"
        @click="onAddAssignmentClick"
        >
          Добавить задание
        </blk-button>
      </b-col>

      <b-col
      class="mt-2 mb-2"
      xs="12"
      md="4"
      >
        <blk-button
        block
        round
        variant="danger"
        @click="showModal = true"
        >
          Закрыть курс
        </blk-button>
      </b-col>
    </b-row>

    <b-modal
    v-model="showModal"
    busy
    centered
    title="Удалить курс?"
    >
      <p class="my-4">
        Это действие приведет к безвозвратному удалению курса. Вы уверены?
      </p>

      <blk-form-buttons slot="modal-footer">
        <blk-button
        class="mr-2"
        @click="showModal = false"
        >
          Отмена
        </blk-button>

        <blk-button
        variant="danger"
        @click="onDeleteClick"
        >
          Удалить
        </blk-button>
      </blk-form-buttons>
    </b-modal>
  </blk-card>
</template>

<script>
import { coursesMethods } from '@/store/helpers';

export default {
  name: 'CourseEditCard',

  data: () => ({
    showModal: false,
  }),

  methods: {
    ...coursesMethods,

    onAddAssignmentClick() {
      const courseId = this.$route.params.id;
      this.$router.push({ name: 'assignment_create', params: { courseId } });
    },

    async onDeleteClick() {
      const courseId = this.$route.params.id;
      await this.deleteCourse({ courseId });

      // Нужно для того, чтобы список курсов обновился.
      // Если этого не сделать, то при переходе на страницу моих курсов или курсов в целом
      // не будет запроса к API (т.к. мы кэшируем извлеченные данные, чтобы не делать лишних запросов),
      // соответственно, нужно будет обновлять страницу вручную, чтобы увидеть созданный курс.
      this.clearCourses();
      this.clearMyCourses();

      this.$router.push({ name: 'my_courses' });
    },

    onEditClick() {
      const id = this.$route.params.id;
      this.$router.push({ name: 'course_update', params: { id } });
    },
  },
};
</script>
