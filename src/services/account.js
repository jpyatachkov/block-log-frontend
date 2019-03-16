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

  userRoles() {
    return this.getPayload().role;
  },
};
