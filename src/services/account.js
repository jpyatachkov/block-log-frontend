import HttpService from './http';
import RouteService from './route';

export default {
  ...HttpService,
  ...RouteService,

  async login({ auth }) {
    const url = this.jwtRoute();
    const data = {
      auth,
    };

    const response = await this.doPost({
      url,
      data,
    });

    const responseData = response.data;

    this.setToken(responseData.jwt);

    return responseData;
  },

  logout() {
    this.clearToken();
  },

  async register({ user }) {
    const url = this.registerRoute();
    const data = {
      user,
    };

    const response = await this.doPost({
      url,
      data,
    });

    return response.data;
  },

  /**
   * @returns {Array}
   */
  userRoles() {
    return this.getPayload().role;
  },

  userCanCreateAndDelete() {
    const AUTHORIZED_ROLES = ['moderator', 'collaborator'];
    const userRoles = this.userRoles();

    return AUTHORIZED_ROLES.some((role) => userRoles.includes(role));
  },

  userCanUpdate() {
    const AUTHORIZED_ROLES = ['moderator', 'collaborator'];
    const userRoles = this.userRoles();

    return AUTHORIZED_ROLES.some((role) => userRoles.includes(role));
  },
};
