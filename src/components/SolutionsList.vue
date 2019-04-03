<template>
  <div class="height-100">
    <div
    v-for="(solution, index) in solutions"
    :key="index"
    >
      <solution-card :solution="solution" />
    </div>
  </div>
</template>

<script>
import SolutionCard from './SolutionCard';

export default {
  name: 'SolutionsList',

  components: {
    SolutionCard,
  },

  data: () => ({
    solutions: [
      {
        createdAt: new Date().toISOString(),
        testsPassed: 10,
        testsCount: 10,
      },
      {
        createdAt: new Date().toISOString(),
        testsPassed: 7,
        testsCount: 10,
      },
      {
        createdAt: new Date().toISOString(),
        testsPassed: 9,
        testsCount: 15,
      },
      {
        createdAt: new Date().toISOString(),
        testsPassed: 15,
        testsCount: 15,
      },
      {
        createdAt: new Date().toISOString(),
        testsPassed: 11,
        testsCount: 15,
      },
      {
        createdAt: new Date().toISOString(),
        testsPassed: 8,
        testsCount: 15,
      },
    ],
  }),
};
</script>
