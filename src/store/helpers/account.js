import '@/typedef';

import { mapActions, mapGetters } from 'vuex';

export const accountComputed = {
  ...mapGetters({
    user: 'account/user',
    userRoles: 'account/userRoles',
  }),
};

/**
 * @typedef {object} AccountMethods
 * @property {{(payload: LoginPayload): Promise<void>}} login
 * @property {{(): Promise<void>}} logout
 * @property {{(payload: User): Promise<void>}} register
 */

/**
 * @type {AccountMethods}
 */
// @ts-ignore
export const accountMethods = {
  ...mapActions({
    login: 'account/login',
    logout: 'account/logout',
    register: 'account/register',
  }),
};
