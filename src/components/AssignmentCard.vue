<template>
  <z-card
  class="AssignmentCard"
  hoverable
  >
    <z-card-title>
      {{ number + 1 }}
    </z-card-title>

    <p>{{ shortText }}</p>
  </z-card>
</template>

<script>
import { ShortenMixin } from '@/mixins';
import ZCard from './ZCard';
import ZCardTitle from './ZCardTitle';

export default {
  name: 'CourseCard',

  components: {
    ZCard,
    ZCardTitle,
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
