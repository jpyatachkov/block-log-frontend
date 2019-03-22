import { mapActions, mapGetters } from 'vuex';

export const accountComputed = {
  ...mapGetters({
    user: 'account/user',
    userRoles: 'account/userRoles',
  }),
};

export const accountMethods = {
  ...mapActions({
    login: 'account/login',
    logout: 'account/logout',
    register: 'account/register',
  }),
};
