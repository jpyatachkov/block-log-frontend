<template>
  <div
  class="AssignmentRow container-fluid"
  :class="additionalStyles"
  >
    <div class="row">
      <div
      class="hidden-sm-down col-md-3 d-flex flex-column justify-content-center align-items-start"
      >
        <div class="AssignmentRow__number">
          {{ number }}
        </div>
      </div>

      <div class="col-xs-12 col-md-5">
        <h4>{{ assignment.title }}</h4>

        {{ description }}

        <a
        v-if="preview && canShowMore"
        href="#"
        @click.prevent="preview = false"
        >Показать полностью...</a>
      </div>

      <div
      class="col-xs-12 col-md-4 d-flex justify-content-center align-items-end pa-4"
      >
        <div v-if="!isEditMode">
          <blk-button
          class="mr-2"
          variant="primary"
          @click="isEditMode = true"
          >
            Редактировать
          </blk-button>
          <blk-button
          variant="danger"
          @click="$emit('delete', assignment.id)"
          >
            Удалить
          </blk-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ShortenMixin } from '@/mixins';

const MAX_PREVIEW_LENGTH = 150;

export default {
  name: 'AssignmentRow',

  mixins: [ShortenMixin],

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
    preview: true,
    isEditMode: false,
  }),

  computed: {
    additionalStyles() {
      return {
        'AssignmentRow--first': this.isFirst,
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
};
</script>

<style lang="scss">
.AssignmentRow {
  width: 100%;

  &--first {
    border-radius: 4px;
    border-bottom-left-radius: none;
    border-bottom-right-radius: none;
  }

  &--last {
    border-radius: 4px;
    border-top-left-radius: none;
    border-top-right-radius: none;
  }

  &__number {
    width: 48px;
    height: 110px;
    background-color: #f4f6fb;
    border: solid 1px #dddddd;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
