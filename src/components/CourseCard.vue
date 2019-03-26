<template>
  <blk-card
  :class="classes"
  :hoverable="preview"
  @click.native="onCardClick"
  >
    <blk-card-header>
      {{ title }}
    </blk-card-header>

    <p>{{ description }}</p>

    <b-row>
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
          v-if="showEnrollButton"
          block
          round
          variant="primary"
          @click="onEnrollClick"
          >
            {{ enrollButtonText }}
          </blk-button>
          <div
          v-else-if="showEditButton"
          class="d-flex fill-width"
          >
            <blk-button
            block
            round
            variant="outline-primary"
            @click="onEditButtonClick"
            >
              {{ editMode ? 'Просмотр' : 'Редактирование' }}
            </blk-button>
          </div>
        </blk-card-actions>
      </b-col>
    </b-row>
  </blk-card>
</template>

<script>
import { AccountService } from '@/services';
import { ShortenMixin } from '@/mixins';
import { coursePermissions } from '@/store/helpers';

export default {
  name: 'CourseCard',

  mixins: [ShortenMixin],

  props: {
    course: {
      required: true,
      type: Object,
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

    classes() {
      return {
        pointer: this.preview,
      };
    },

    description() {
      let description = this.course.description;

      if (this.preview) {
        description = this.shorten(description, 100);
      }

      return description;
    },

    enrollButtonText() {
      let text;

      if (AccountService.userIsStaff()) {
        text = 'Преподавать курс';
      } else {
        text = 'Записаться на курс';
      }

      return text;
    },

    showEditButton() {
      return (
        this.userIsEnrolled && (this.userIsCollaborator || this.userIsModerator)
      );
    },

    showEnrollButton() {
      return !this.userIsEnrolled;
    },

    title() {
      let title = this.course.title;

      if (this.preview) {
        title = this.shorten(title, 50);
      }

      return title;
    },
  },

  methods: {
    onCardClick() {
      if (this.preview) {
        const id = this.course.id;
        this.$router.push({ name: 'course', params: { id } });
      }
    },

    onEditButtonClick() {
      this.editMode = !this.editMode;
      this.$emit('edit', this.editMode);
    },

    onEnrollClick() {},
  },
};
</script>
