<template>
  <blk-card :hoverable="preview">
    <blk-card-header>
      {{ title }}
    </blk-card-header>

    <p>{{ description }}</p>
  </blk-card>
</template>

<script>
import { ShortenMixin } from '@/mixins';

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

  computed: {
    title() {
      let title = this.course.title;

      if (this.preview) {
        title = this.shorten(title, 50);
      }

      return title;
    },

    description() {
      let description = this.course.description;

      if (this.preview) {
        description = this.shorten(description, 100);
      }

      return description;
    },
  },
};
</script>
