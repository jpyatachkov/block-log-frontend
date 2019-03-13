import HttpService from './http';
import RouteService from './route';

export default {
  ...HttpService,
  ...RouteService,

  async getCourses({ page, size = 16 }) {
    const url = this.coursesRoute();
    const response = await this.doGet({
      url,
      params: { page, size },
    });
    return response.data;
  },
};
