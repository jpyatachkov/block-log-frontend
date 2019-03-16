<template>
  <z-card
  class="CourseCard"
  hoverable
  @click.native="onClick"
  >
    <z-card-title>
      {{ shortTitle }}
    </z-card-title>

    <p>{{ shortDescription }}</p>
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
    shortTitle() {
      return this.preview
        ? this.shorten(this.course.title, 25)
        : this.course.title || '';
    },

    shortDescription() {
      return this.preview
        ? this.shorten(this.course.description, 100)
        : this.course.description || '';
    },
  },

  methods: {
    onClick() {
      if (this.preview) {
        this.$router.push({ name: 'course', params: { id: this.course.id } });
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.CourseCard
  cursor pointer
</style>
