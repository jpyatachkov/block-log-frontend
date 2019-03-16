import '@/typedef';

import { mapActions, mapGetters } from 'vuex';

export const coursesComputed = {
  ...mapGetters({
    course: 'courses/item',
    courses: 'courses/items',
    coursesTotal: 'courses/total',
  }),
};

/**
 * @typedef {Object} CoursesMethods
 * @property {{({ page: number, size: number }): Promise<void>}} getCourses
 * @property {{({ courseId: number }): Promise<void>}} getCourse
 * @property {{({ course: Course }): Promise<void>}} createCourse
 * @property {{({ course: Course }): Promise<void>}} updateCourse
 */

/**
 * @type {CoursesMethods}
 */
// @ts-ignore
export const coursesMethods = {
  ...mapActions({
    getCourses: 'courses/get',
    getCourse: 'courses/getOne',
    createCourse: 'courses/create',
    updateCourse: 'courses/update',
  }),
};
