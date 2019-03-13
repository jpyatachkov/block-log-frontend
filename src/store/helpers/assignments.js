import '@/typedef';

import { mapActions, mapGetters } from 'vuex';

export const assignmentsComputed = {
  ...mapGetters({
    assignments: 'assignments/items',
    assignmentsTotal: 'assignments/total',
  }),
};

/**
 * @typedef {Object} AssignmentsMethods
 * @property {{({ courseId: number, page: number, size: number }): Promise<void>}} getAssignments
 */

/**
 * @type {AssignmentsMethods}
 */
// @ts-ignore
export const assignmentsMethods = {
  ...mapActions({
    getAssignments: 'assignments/get',
  }),
};
