<template>
  <app-card :hoverable="false">
    <p class="mb-1 text-bold">
      Сложность курса:
    </p>

    <div class="mb-2 mr-2 d-flex justify-content-between align-items-start">
      <div
      v-if="course.complexity"
      class="d-flex justify-content-center align-items-start"
      >
        <div
        v-for="i in course.complexity"
        :key="`star${i}`"
        class="CourseComplexityCard__img-container"
        >
          <img
          class="max-height-100 max-width-100"
          :src="require('@/assets/star.png')"
          >
        </div>

        <div
        v-for="i in emptyStarsCount"
        :key="`empty-star${i}`"
        class="CourseComplexityCard__img-container"
        >
          <img
          class="max-height-100 max-width-100"
          :src="require('@/assets/empty-star.png')"
          >
        </div>
      </div>

      <p class="mb-0">
        {{ complexityAsWord }}
      </p>
    </div>

    <p class="mb-1 text-bold">
      Нагрузка:
    </p>

    <div class="d-flex justify-content-start align-items-center">
      {{ +course.countAssignments }} заданий
    </div>
  </app-card>
</template>

<script>
import { CourseComplexityMixin } from '@/mixins';
import { coursesComputed } from '@/store/helpers';

const MAX_COMPLEXITY = 5;

export default {
  name: 'CourseComplexityCard',

  mixins: [CourseComplexityMixin],

  computed: {
    ...coursesComputed,

    complexityAsWord() {
      return this.complexityToWord(this.course.complexity);
    },

    emptyStarsCount() {
      return MAX_COMPLEXITY - this.course.complexity;
    },
  },
};
</script>

<style lang="scss" scoped>
.CourseComplexityCard {
  &__img-container {
    width: 20px;
    height: 20px;
  }
}
</style>
