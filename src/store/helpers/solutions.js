import { mapActions, mapGetters } from 'vuex';

export const solutionsComputed = {
  ...mapGetters({
    solution: 'solutions/item',
    solutions: 'solutions/items',
    solutionstotal: 'solutions/total',
  }),
};

export const solutionsMethods = {
  ...mapActions({
    getSolutions: 'solutions/get',
    getSolution: 'solutions/getOne',
    createSolution: 'solutions/create',
  }),
};
