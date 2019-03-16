import '@/typedef';

import { mapActions, mapGetters } from 'vuex';

export const assignmentsComputed = {
  ...mapGetters({
    assignment: 'assignments/item',
    assignments: 'assignments/items',
    assignmentsTotal: 'assignments/total',
  }),
};

/**
 * @typedef {Object} AssignmentsMethods
 * @property {{({ courseId: number, page: number, size: number }): Promise<void>}} getAssignments
 * @property {{({ courseId: number, assignmentId: number }): Promise<void>}} getAssignment
 * @property {{({ courseId: number, assignment: any }): Promise<void>}} createAssignment
 * @property {{({ courseId: number, assignmentId: number, assignment: any }): Promise<void>}} updateAssignment
 */

/**
 * @type {AssignmentsMethods}
 */
// @ts-ignore
export const assignmentsMethods = {
  ...mapActions({
    getAssignments: 'assignments/get',
    getAssignment: 'assignments/getOne',
    createAssignment: 'assignments/create',
    updateAssignment: 'assignments/update',
  }),
};
