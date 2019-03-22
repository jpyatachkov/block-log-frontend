import { mapActions, mapGetters } from 'vuex';

export const coursesComputed = {
  ...mapGetters({
    course: 'courses/item',
    courses: 'courses/items',
    coursesTotal: 'courses/total',
  }),
};

export const coursesMethods = {
  ...mapActions({
    getCourses: 'courses/get',
    getCourse: 'courses/getOne',
    createCourse: 'courses/create',
    updateCourse: 'courses/update',
  }),
};
