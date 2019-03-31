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
    course: 'courses/getCourse',
    courseForm: 'courses/form/data',
    courses: 'courses/getCourseList',
    coursesTotal: 'courses/getCourseTotal',
    myCourses: 'courses/getMyCourseList',
    myCoursesTotal: 'courses/getMyCourseTotal',
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
    clearCourses: 'courses/clearCourseList',
    clearMyCourses: 'courses/clearMyCourseList',
    clearCourseForm: 'courses/form/clear',
  }),
};
