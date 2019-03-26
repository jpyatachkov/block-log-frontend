import { mapActions, mapGetters, mapMutations } from 'vuex';

export const coursesComputed = {
  ...mapGetters({
    course: 'courses/item',
    courseForm: 'courses/form/data',
    courseFormUnsaved: 'courses/form/unsaved',
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
    fillCourseForm: 'courses/form/fill',
    createCourse: 'courses/form/create',
    updateCourse: 'courses/form/update',
  }),

  ...mapMutations({
    clearCourses: 'courses/clearItems',
    clearMyCourses: 'courses/clearMyItems',
    clearCourseForm: 'courses/form/clear',
  }),
};
