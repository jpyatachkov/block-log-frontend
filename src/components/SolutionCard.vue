<template>
  <div
  class="SolutionCard__container mt-3 mb-3"
  :class="containerClasses"
  >
    <aside class="pl-3 pt-3 pb-3">
      <blk-card-header> Решение {{ createdAt }} </blk-card-header>

      <p>
        Успешно пройдено тестов: {{ solution.testsPassed }}/{{
          solution.testsCount
        }}
      </p>
    </aside>

    <div
    class="SolutionCard__status"
    :class="statusClasses"
    />
  </div>
</template>

<script>
export default {
  name: 'SolutionCard',

  props: {
    solution: {
      required: true,
      type: Object,
    },
  },

  computed: {
    containerClasses() {
      return {
        // 'SolutionCard__container--success': this.correct,
        // 'SolutionCard__container--error': !this.correct,
      };
    },

    correct() {
      return (
        !!this.solution.testsPassed &&
        !!this.solution.testsCount &&
        this.solution.testsPassed === this.solution.testsCount
      );
    },

    createdAt() {
      const date = this.solution.createdAt.slice(0, 10);
      return date
        .split('-')
        .reverse()
        .join('.');
    },

    statusClasses() {
      return {
        'SolutionCard__status--success': this.correct,
        'SolutionCard__status--error': !this.correct,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.SolutionCard__container {
  background-color: #fff;
  border-radius: 6px;
  height: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
}

.SolutionCard__container--success {
  box-shadow: 8px 8px 8px rgba(39, 188, 118, 0.25);
}

.SolutionCard__container--error {
  box-shadow: 8px 8px 8px rgba(244, 118, 118, 0.25);
}

.SolutionCard__status {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  height: 100%;
  width: 70px;
}

.SolutionCard__status--success {
  background-color: #27bc76;
}

.SolutionCard__status--error {
  background-color: #f47676;
}
</style>
