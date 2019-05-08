<template>
  <div
  class="AssignmentRow container-fluid"
  :class="additionalStyles"
  >
    <div class="AssignmentRow__preview row">
      <div
      class="pl-0 d-none col-md-2 d-md-flex flex-column justify-content-center align-items-start"
      >
        <div class="AssignmentRow__number">
          {{ number }}
        </div>
      </div>

      <div class="col-xs-12 col-md-6">
        <h4 class="text-overflow-ellipsis">
          {{ assignment.title }}
        </h4>

        <app-card-text class="text-overflow-ellipsis">
          {{ description }}
        </app-card-text>

        <a
        v-if="preview && canShowMore"
        href="#"
        @click.prevent="preview = false"
        >Показать полностью...</a>
      </div>

      <div
      class="col-xs-12 col-md-4 d-flex flex-column justify-content-center align-items-end pa-4"
      >
        <div v-if="!isEditMode">
          <edit-button
          class="mb-2 mr-2"
          variant="primary"
          @click="isEditMode = true"
          >
            Редактировать
          </edit-button>

          <delete-button
          class="mb-2 mr-2"
          @click="showModal = true"
          />
        </div>
      </div>
    </div>

    <div
    v-if="isEditMode"
    class="row pt-4 pb-4 AssignmentRow__form"
    >
      <assignment-container
      :assignment-id="assignment.id"
      update
      @hide="isEditMode = false"
      />
    </div>

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
        :disabled="loading"
        class="mr-2"
        @click="showModal = false"
        >
          Отмена
        </blk-button>

        <blk-button
        :disabled="loading"
        :loading="loading"
        variant="danger"
        @click="onDeleteClick"
        >
          Удалить
        </blk-button>
      </blk-form-buttons>
    </b-modal>
  </div>
</template>

<script>
import { LoadingMixin, ShortenMixin } from '@/mixins';
import eventBus, { EVENTS } from '@/bus';

import AssignmentContainer from './AssignmentContainer';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import { assignmentsMethods } from '@/store/helpers';

const MAX_PREVIEW_LENGTH = 150;

export default {
  name: 'AssignmentRow',

  components: {
    AssignmentContainer,
    DeleteButton,
    EditButton,
  },

  mixins: [LoadingMixin, ShortenMixin],

  props: {
    assignment: {
      required: true,
      type: Object,
    },
    isFirst: {
      default: false,
      type: Boolean,
    },
    isLast: {
      default: false,
      type: Boolean,
    },
    number: {
      required: true,
      type: Number,
    },
  },

  data: () => ({
    isEditMode: false,
    preview: true,
    showModal: false,
  }),

  computed: {
    additionalStyles() {
      return {
        'AssignmentRow--first': this.isFirst,
        'AssignmentRow--not-last': !this.isLast,
        'AssignmentRow--last': this.isLast,
      };
    },

    canShowMore() {
      return this.assignment.description.length > MAX_PREVIEW_LENGTH;
    },

    description() {
      return this.preview
        ? this.shorten(this.assignment.description, MAX_PREVIEW_LENGTH)
        : this.assignment.description;
    },
  },

  methods: {
    ...assignmentsMethods,

    async onDeleteClick() {
      this.setLoading(true);

      const courseId = this.$route.params.id;
      const assignmentId = this.assignment.id;
      await this.deleteAssignment({ courseId, assignmentId });

      eventBus.$emit(EVENTS.SHOW_TOAST, { message: 'Задача удалена' });

      this.showModal = false;
      this.setLoading(false);
    },
  },
};
</script>

<style lang="scss">
$row-border-radius: 4px;
$list-border-radius: $row-border-radius * 2;

.AssignmentRow {
  width: 100%;
  border: solid 1px #dddddd;

  &--first {
    border-top-left-radius: $row-border-radius;
    border-top-right-radius: $row-border-radius;
  }

  &--not-last {
    border-bottom: 0px;
  }

  &--last {
    border-bottom-left-radius: $row-border-radius;
    border-bottom-right-radius: $row-border-radius;
  }

  &__preview {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  &__number {
    width: 48px;
    height: 110px;
    background-color: #f4f6fb;

    border: solid 1px #dddddd;
    border-left: 0px;
    border-top-right-radius: $list-border-radius;
    border-bottom-right-radius: $list-border-radius;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__form {
    background-color: #f4f6fb;
  }
}
</style>
