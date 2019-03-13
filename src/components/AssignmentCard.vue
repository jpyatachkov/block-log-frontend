<template>
  <z-card class="AssignmentCard">
    <div class="AssignmentCard__course-number">
      <h2>{{ number + 1 }}</h2>
    </div>

    <p>{{ shortText }}</p>
  </z-card>
</template>

<script>
import { ShortenMixin } from '@/mixins';
import ZCard from './ZCard';

export default {
  name: 'CourseCard',

  components: {
    ZCard,
  },

  mixins: [ShortenMixin],

  props: {
    assignment: {
      required: true,
      type: Object,
    },
    number: {
      default: -1,
      type: Number,
    },
    preview: {
      default: true,
      type: Boolean,
    },
  },

  computed: {
    shortText() {
      return this.preview
        ? this.shorten(this.assignment.text, 100)
        : this.assignment.text;
    },
  },
};
</script>

<style lang="stylus" scoped>
.AssignmentCard
  cursor pointer

.AssignmentCard__course-number
  color primary
  min-height 50px
</style>
