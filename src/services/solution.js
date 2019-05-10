import HttpService from './http';
import RouteService from './route';

export default {
  ...HttpService,
  ...RouteService,

  async getSolutions({ courseId, assignmentId, page, size = 100 }) {
    const url = this.solutionsRoute(courseId, assignmentId);
    const params = {
      page,
      size,
    };

    const response = await this.doGet({
      url,
      params,
    });

    return response.data;
  },

  async getSolution({ solutionId }) {
    const url = this.solutionRoute(solutionId);
    const response = await this.doGet({ url });
    return response.data;
  },

  async createSolution({ solution }) {
    const url = this.solutionCreateRoute();
    const data = {
      solution,
    };

    const response = await this.doPost({
      url,
      data,
    });

    return response.data;
  },
};
