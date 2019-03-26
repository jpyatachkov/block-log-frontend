import { mapActions, mapGetters, mapMutations } from 'vuex';

export const assignmentsComputed = {
  ...mapGetters({
    assignment: 'assignments/item',
    assignmentForm: 'assignments/form/data',
    assignmentFormUnsaved: 'assignments/form/unsaved',
    assignments: 'assignments/items',
    assignmentsTotal: 'assignments/total',
  }),
};

export const assignmentsMethods = {
  ...mapActions({
    getAssignments: 'assignments/get',
    getAssignment: 'assignments/getOne',
    createAssignment: 'assignments/form/create',
    updateAssignment: 'assignments/form/update',
  }),

  ...mapMutations({
    clearAssignments: 'assignments/clearItems',
    clearAssignmentForm: 'assignments/form/clear',
    setAssignmentForm: 'assignments/form/set',
  }),
};
