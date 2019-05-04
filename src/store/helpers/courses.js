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
    myActiveCourses: 'courses/getMyActiveCourseList',
    myActiveCoursesTotal: 'courses/getMyActiveCourseTotal',
    myInactiveCourses: 'courses/getMyInactiveCourseList',
    myInactiveCoursesTotal: 'courses/getMyInactiveCourseTotal',
    coursesEditState: 'courses/getCourseEditState',
  }),

  ...coursePermissions,
};

export const coursesMethods = {
  ...mapActions({
    getCourses: 'courses/get',
    getMyActiveCourses: 'courses/getMineActive',
    getMyInactiveCourses: 'courses/getMineInactive',
    getCourse: 'courses/getOne',
    enrollCourse: 'courses/enroll',
    fillCourseForm: 'courses/form/fill',
    createCourse: 'courses/form/create',
    updateCourse: 'courses/form/update',
    deleteCourse: 'courses/delete',
  }),

  ...mapMutations({
    changeCoursesEditState: 'courses/changeCourseEditState',
    clearCourses: 'courses/clearCourseList',
    clearMyCourses: 'courses/clearMyCourseList',
    clearCourseForm: 'courses/form/clear',
  }),
};
