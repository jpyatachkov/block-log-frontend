import { mapActions, mapGetters, mapMutations } from 'vuex';

export const coursePermissions = {
  ...mapGetters({
    userIsEnrolled: 'courses/userIsEnrolled',
    userIsCollaborator: 'courses/userIsCollaborator',
    userIsModerator: 'courses/userIsModerator',
  }),
};

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

  ...coursePermissions,
};

export const coursesMethods = {
  ...mapActions({
    getCourses: 'courses/get',
    getMyCourses: 'courses/getMine',
    getCourse: 'courses/getOne',
    enrollCourse: 'courses/enroll',
    fillCourseForm: 'courses/form/fill',
    createCourse: 'courses/form/create',
    updateCourse: 'courses/form/update',
    deleteCourse: 'courses/delete',
  }),

  ...mapMutations({
    clearCourses: 'courses/clearItems',
    clearMyCourses: 'courses/clearMyItems',
    clearCourseForm: 'courses/form/clear',
  }),
};
