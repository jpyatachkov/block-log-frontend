import { mapActions, mapGetters, mapMutations } from 'vuex';

import { createHelpers } from 'vuex-map-fields';

const { mapFields } = createHelpers({
  getterType: 'courses/form/getField',
  mutationType: 'courses/form/updateField',
});

export const coursesComputed = {
  ...mapGetters({
    course: 'courses/item',
    courses: 'courses/items',
    coursesTotal: 'courses/total',
    myCourses: 'courses/myItems',
    myCoursesTotal: 'courses/myTotal',
  }),

  ...mapFields(['title', 'description']),
};

export const coursesMethods = {
  ...mapActions({
    getCourses: 'courses/get',
    getMyCourses: 'courses/getMine',
    getCourse: 'courses/getOne',
    createCourse: 'courses/form/create',
    updateCourse: 'courses/form/update',
  }),

  ...mapMutations({
    clearCourses: 'courses/clearItems',
    clearMyCourses: 'courses/clearMyItems',
  }),
};
