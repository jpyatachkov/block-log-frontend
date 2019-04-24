<template>
  <app-card :hoverable="false">
    <p class="mb-0 text-bold">
      Сложность курса
    </p>

    <div class="d-flex justify-content-between align-items-start">
      <div class="d-flex justify-content-center align-items-start">
        <div
        v-for="i in complexity"
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
        Средняя
      </p>
    </div>
  </app-card>
</template>

<script>
const MAX_COMPLEXITY = 5;

export default {
  name: 'CourseComplexityCard',

  data: () => ({
    complexity: 3,
  }),

  computed: {
    emptyStarsCount() {
      return MAX_COMPLEXITY - this.complexity;
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
