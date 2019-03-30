import { mapActions, mapGetters, mapMutations } from 'vuex';

export const assignmentsComputed = {
  ...mapGetters({
    assignment: 'assignments/getAssignment',
    assignmentForm: 'assignments/form/data',
    assignmentFormUnsaved: 'assignments/form/unsaved',
    assignments: 'assignments/getAssignmentList',
    assignmentsTotal: 'assignments/getAssignmentTotal',
  }),
};

export const assignmentsMethods = {
  ...mapActions({
    getAssignments: 'assignments/get',
    getAssignment: 'assignments/getOne',
    createAssignment: 'assignments/form/create',
    updateAssignment: 'assignments/form/update',
    deleteAssignment: 'assignments/delete',
  }),

  ...mapMutations({
    clearAssignments: 'assignments/clearAssignmentList',
    clearAssignmentForm: 'assignments/form/clear',
    setAssignmentForm: 'assignments/form/set',
  }),
};
