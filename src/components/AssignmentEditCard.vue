<template>
  <b-row>
    <b-col lg="3" />

    <b-col
    xs="12"
    md="6"
    lg="3"
    >
      <blk-button
      block
      class="mr-2"
      round
      variant="primary"
      @click="onEditClick"
      >
        Редактировать задание
      </blk-button>
    </b-col>

    <!-- <b-col
    xs="12"
    md="6"
    lg="3"
    >
      <blk-button
      block
      round
      variant="danger"
      @click="showModal = true"
      >
        Удалить задание
      </blk-button>
    </b-col> -->

    <b-modal
    v-model="showModal"
    busy
    centered
    title="Удалить курс?"
    >
      <p class="my-4">
        Это действие приведет к безвозвратному удалению задания. Вы уверены?
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
  </b-row>
</template>

<script>
import { assignmentsMethods } from '@/store/helpers';

export default {
  name: 'AssignmentEditCard',

  data: () => ({
    showModal: false,
  }),

  methods: {
    ...assignmentsMethods,

    async onDeleteClick() {
      // const courseId = this.$route.params.courseId;
      // const assignmentId = this.$route.params.id;
      // await this.deleteAssignment({ courseId, assignmentId });
      // this.clearAssignments();
    },

    onEditClick() {
      const courseId = this.$route.params.courseId;
      const id = this.$route.params.id;

      this.$router.push({
        name: 'assignment_update',
        params: { courseId, id },
      });
    },
  },
};
</script>
