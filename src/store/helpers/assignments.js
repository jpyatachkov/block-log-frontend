import { mapActions, mapGetters, mapMutations } from 'vuex';

export const assignmentsComputed = {
  ...mapGetters({
    assignment: 'assignments/item',
    assignments: 'assignments/items',
    assignmentsTotal: 'assignments/total',
  }),
};

export const assignmentsMethods = {
  ...mapActions({
    getAssignments: 'assignments/get',
    getAssignment: 'assignments/getOne',
    createAssignment: 'assignments/create',
    updateAssignment: 'assignments/update',
  }),

  ...mapMutations({
    clearAssignments: 'assignments/clearItems',
  }),
};
