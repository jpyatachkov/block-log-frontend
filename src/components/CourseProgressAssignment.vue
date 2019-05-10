<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col">
        <div class="d-flex justify-content-start align-items-center w-100">
          <h5 class="mr-2">
            Задача {{ assignmentIndex + 1 }}
          </h5>

          <app-status
          class="mb-2"
          :success="!!assignment.passed"
          />
        </div>
      </div>

      <div class="col d-flex justify-content-end align-items-center">
        <blk-button
        class="CourseProgressAssignment__solution-button"
        variant="primary"
        >
          Решить задачу <img :src="require('@/assets/forward.png')">
        </blk-button>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <router-link
        :to="{ name: 'course', params: { id: $route.params.courseId } }"
        >
          Вернуться к просмотру курса
        </router-link>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col">
        <h5>{{ assignment.title }}</h5>
      </div>
    </div>

    <div class="row">
      <div class="col">
        {{ assignment.description }}
      </div>
    </div>

    <div class="row">
      <hr class="col">
    </div>

    <test-example
    v-if="testExample"
    :test="testExample"
    />

    <div
    v-if="testExample"
    class="row"
    >
      <hr class="col">
    </div>

    <div class="row">
      <div class="col">
        <h5>Прогресс решения</h5>
      </div>
    </div>

    <solutions-table
    v-if="solutions && solutions.length"
    class="mt-2"
    />
    <div
    v-else
    class="text-center w-100 mt-2 d-flex justify-content-center align-items-center"
    >
      Вы пока не сделали ни одной попытки. Нажмите кнопку "Решить задачу", чтобы
      попробовать.
    </div>
  </div>
</template>

<script>
import {
  assignmentsComputed,
  solutionsComputed,
  solutionsMethods,
} from '@/store/helpers';

import SolutionsTable from './SolutionsTable';
import TestExample from './TestExample';

export default {
  name: 'CourseProgressAssignment',

  components: {
    SolutionsTable,
    TestExample,
  },

  computed: {
    ...assignmentsComputed,
    ...solutionsComputed,

    testExample() {
      return this.assignment.tests ? this.assignment.tests[0] : null;
    },
  },

  methods: {
    ...solutionsMethods,
  },
};
</script>

<style lang="scss">
.CourseProgressAssignment {
  &__solution-button {
    background-color: #24be74;
  }
}
</style>
