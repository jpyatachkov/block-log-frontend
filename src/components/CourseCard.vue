<template>
  <z-card
  class="CourseCard"
  @click.native="onClick"
  >
    <z-card-title>
      <h2>{{ shortTitle }}</h2>
    </z-card-title>

    <vs-row
    v-if="!preview"
    class="mt-1 mb-1"
    vs-align="center"
    vs-type="flex"
    vs-justify="flex-end"
    vs-w="12"
    >
      <z-button
      color="primary"
      size="large"
      >
        Записаться
      </z-button>
    </vs-row>

    <p>{{ shortDescription }}</p>
  </z-card>
</template>

<script>
import { ShortenMixin } from '@/mixins';
import ZButton from './ZButton';
import ZCard from './ZCard';
import ZCardTitle from './ZCardTitle';

export default {
  name: 'CourseCard',

  components: {
    ZButton,
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
