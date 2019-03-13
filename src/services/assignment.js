import HttpService from './http';
import RouteService from './route';

export default {
  ...HttpService,
  ...RouteService,

  async getAssignments({ courseId, page, size = 16 }) {
    const url = this.assignmentsRoute(courseId);
    const response = await this.doGet({
      url,
      params: {
        page,
        size,
      },
    });
    return response.data;
  },
};
