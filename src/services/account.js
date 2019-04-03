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
      redirect: false,
    });

    const responseData = response.data;

    this.setToken(responseData.jwt);

    return responseData;
  },

  logout() {
    this.clearToken();
  },

  async me() {
    const url = this.meRoute();
    const response = await this.doGet({ url });
    return response.data;
  },

  async register({ user }) {
    const url = this.registerRoute();
    const data = {
      user,
    };

    const response = await this.doPost({
      url,
      data,
      redirect: false,
    });

    return response.data;
  },

  /**
   * @returns {Array}
   */
  userRoles() {
    return this.getPayload().role || [];
  },

  /**
   * @returns {Array}
   */
  userIsStaff() {
    const AUTHORIZED_ROLES = ['collaborator', 'moderator'];
    const userRoles = this.userRoles();

    return AUTHORIZED_ROLES.some((role) => userRoles.includes(role));
  },

  /**
   * @returns {Boolean}
   */
  userCanCreateCourses() {
    const AUTHORIZED_ROLES = ['moderator'];
    const userRoles = this.userRoles();

    return AUTHORIZED_ROLES.some((role) => userRoles.includes(role));
  },
};
