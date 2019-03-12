import HttpService from './http';
import RouteService from './route';

export default {
  ...HttpService,
  ...RouteService,

  async login({ userToken }) {
    const url = this.jwtRoute();
    const data = {
      userToken,
    };

    const response = await this.doPost({
      url,
      data,
    });

    return response.data;
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
};
