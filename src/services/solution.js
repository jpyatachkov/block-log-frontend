import HttpService from './http';
import RouteService from './route';

export default {
  ...HttpService,
  ...RouteService,

  async getSolutions({ courseId, assignmentId, page, size }) {
    const url = this.solutionsRoute(courseId, assignmentId);
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
