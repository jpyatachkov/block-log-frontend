<template>
  <z-card class="CourseCard">
    <z-card-header
    slot="header"
    :title="shortTitle"
    />

    <p>{{ shortDescription }}</p>
  </z-card>
</template>

<script>
import { ShortenMixin } from '@/mixins';
import ZCard from './ZCard';
import ZCardHeader from './ZCardHeader';

export default {
  name: 'CourseCard',

  components: {
    ZCard,
    ZCardHeader,
  },

  mixins: [ShortenMixin],

  props: {
    course: {
      required: true,
      type: Object,
    },
  },

  computed: {
    shortTitle() {
      return this.shorten(this.course.title, 25);
    },

    shortDescription() {
      return this.shorten(this.course.description, 100);
    },
  },
};
</script>

<style lang="stylus" scoped>
.CourseCard
  cursor pointer
</style>
