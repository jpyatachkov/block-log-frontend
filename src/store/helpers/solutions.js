import { mapActions, mapGetters, mapMutations } from 'vuex';

export const solutionsComputed = {
  ...mapGetters({
    canLoadMoreSolutions: 'solutions/canLoadMore',
    solution: 'solutions/getSolution',
    solutions: 'solutions/getSolutionList',
    solutionsTotal: 'solutions/getSolutionTotal',
    solutionSent: 'solutions/sent',
  }),
};

export const solutionsMethods = {
  ...mapActions({
    getSolution: 'solutions/getOne',
    getSolutions: 'solutions/get',
    createSolution: 'solutions/create',
  }),

  ...mapMutations({
    clearSolutions: 'solutions/clearSolutionList',
    setSolutionSent: 'solutions/setSent',
  }),
};
