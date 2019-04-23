import { mapActions, mapGetters } from 'vuex';

export const accountComputed = {
  ...mapGetters({
    user: 'account/user',
    userCanCreateCourses: 'account/canCreateCourses',
    userDisplayName: 'account/displayName',
    userIsStaff: 'account/isStaff',
  }),
};

export const accountMethods = {
  ...mapActions({
    login: 'account/login',
    logout: 'account/logout',
    register: 'account/register',
  }),
};
