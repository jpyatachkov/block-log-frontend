<template>
  <blk-card
  :class="classes"
  :hoverable="preview"
  @click.native="onClick"
  >
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

    classes() {
      return {
        pointer: this.preview,
      };
    },
  },

  methods: {
    onClick() {
      if (this.preview) {
        const id = this.course.id;
        this.$router.push({ name: 'course', params: { id } });
      }
    },
  },
};
</script>
