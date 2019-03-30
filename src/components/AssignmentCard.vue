<template>
  <blk-card
  :hoverable="preview"
  @click.native="onCardClick"
  >
    <assignment-card-number
    v-if="preview"
    slot="image"
    :number="index"
    />

    {{ text }}

    <b-row class="mt-3">
      <b-col
      md="8"
      lg="9"
      />

      <b-col
      xs="12"
      md="4"
      lg="3"
      >
        <blk-card-actions v-if="!preview">
          <blk-button
          block
          round
          variant="outline-primary"
          @click="onEditButtonClick"
          >
            {{ editMode ? 'Просмотр' : 'Редактирование' }}
          </blk-button>
        </blk-card-actions>
      </b-col>
    </b-row>
  </blk-card>
</template>

<script>
import { CoursePermissionsMixin, ShortenMixin } from '@/mixins';

import AssignmentCardNumber from './AssignmentCardNumber';
import { coursePermissions } from '@/store/helpers';

export default {
  name: 'AssignmentCard',

  components: {
    AssignmentCardNumber,
  },

  mixins: [CoursePermissionsMixin, ShortenMixin],

  props: {
    assignment: {
      required: true,
      type: Object,
    },
    index: {
      default: 0,
      type: Number,
    },
    preview: {
      default: true,
      type: Boolean,
    },
  },

  data: () => ({
    editMode: false,
  }),

  computed: {
    ...coursePermissions,

    text() {
      let text = this.assignment.text;

      if (this.preview) {
        text = this.shorten(text, 100);
      }

      return text;
    },
  },

  methods: {
    onCardClick() {
      if (this.preview) {
        const courseId = this.assignment.course.id;
        const id = this.assignment.id;

        this.$router.push({ name: 'assignment', params: { courseId, id } });
      }
    },

    onEditButtonClick() {
      this.editMode = !this.editMode;
      this.$emit('edit', this.editMode);
    },
  },
};
</script>
