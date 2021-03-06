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

    <blk-card-header>
      {{ title }}

      <div
      v-if="!preview"
      slot="link-back"
      class="mb-2"
      >
        <router-link
        :to="{ name: 'course', params: { id: $route.params.courseId } }"
        >
          К странице курса
        </router-link>
      </div>
    </blk-card-header>

    <p v-if="!preview">
      {{ assignment.description }}
    </p>

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
        <blk-card-actions v-if="!preview && userCanEdit">
          <blk-button
          block
          round
          variant="outline-primary"
          @click="onEditButtonClick"
          >
            {{ isEditMode ? 'Просмотр' : 'Редактирование' }}
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
    isEditMode: {
      default: false,
      type: Boolean,
    },
    preview: {
      default: true,
      type: Boolean,
    },
  },

  computed: {
    ...coursePermissions,

    title() {
      let title = this.assignment.title;

      if (this.preview) {
        title = this.shorten(title, 100);
      }

      return title;
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
      this.$emit('edit', !this.isEditMode);
    },
  },
};
</script>
