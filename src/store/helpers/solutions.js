import { mapActions, mapGetters, mapMutations } from 'vuex';

export const solutionsComputed = {
  ...mapGetters({
    solution: 'solutions/getSolution',
    solutions: 'solutions/getSolutionList',
    solutionsTotal: 'solutions/getSolutionTotal',
    solutionSent: 'solutions/sent',
  }),
};

export const solutionsMethods = {
  ...mapActions({
    getSolutions: 'solutions/get',
    getSolution: 'solutions/getOne',
    createSolution: 'solutions/create',
  }),

  ...mapMutations({
    clearSolutions: 'solutions/clearSolutionList',
    setSolutionSent: 'solutions/setSent',
  }),
};
