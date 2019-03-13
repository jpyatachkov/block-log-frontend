import '@/typedef';

import { mapActions, mapGetters } from 'vuex';

export const coursesComputed = {
  ...mapGetters({
    courses: 'courses/items',
  }),
};

/**
 * @typedef {Object} CoursesMethods
 * @property {{({ page: number, size: number }): Promise<void>}} getCourses
 */

/**
 * @type {CoursesMethods}
 */
// @ts-ignore
export const coursesMethods = {
  ...mapActions({
    getCourses: 'courses/get',
  }),
};
