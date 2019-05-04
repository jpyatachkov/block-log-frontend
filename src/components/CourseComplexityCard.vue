<template>
  <app-card :hoverable="false">
    <p class="mb-1 text-bold">
      Сложность курса:
    </p>

    <div class="mb-2 d-flex justify-content-between align-items-start">
      <div class="d-flex justify-content-center align-items-start">
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

      <p class="ml-2 mb-0">
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
import { coursesComputed } from '@/store/helpers';

const MAX_COMPLEXITY = 5;

export default {
  name: 'CourseComplexityCard',

  computed: {
    ...coursesComputed,

    complexityAsWord() {
      switch (this.course.complexity) {
        case 1:
          return 'Низкая';
        case 2:
          return 'Ниже средней';
        case 3:
          return 'Средняя';
        case 4:
          return 'Выше средней';
        case 5:
          return 'Высокая';
        default:
          return 'Не задана';
      }
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
