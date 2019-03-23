import { mapActions, mapGetters, mapMutations } from 'vuex';

export const coursesComputed = {
  ...mapGetters({
    course: 'courses/item',
    courses: 'courses/items',
    coursesTotal: 'courses/total',
    myCourses: 'courses/myItems',
    myCoursesTotal: 'courses/myTotal',
  }),
};

export const coursesMethods = {
  ...mapActions({
    getCourses: 'courses/get',
    getMyCourses: 'courses/getMine',
    getCourse: 'courses/getOne',
    createCourse: 'courses/create',
    updateCourse: 'courses/update',
  }),

  ...mapMutations({
    clearCourses: 'courses/clearItems',
    clearMyCourses: 'courses/clearMyItems',
  }),
};
