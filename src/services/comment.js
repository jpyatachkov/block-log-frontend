import HttpService from './http';
import RouteService from './route';

export default {
  ...HttpService,
  ...RouteService,

  async __getComments({ resource, page, size = 16 }) {
    const url = this.commentsRoute();
    const params = {
      resource,
      page,
      size,
    };

    const response = await this.doGet({
      url,
      params,
    });

    return response.data;
  },

  async getCourseComments({ page, size = 16 }) {
    return this.__getComments({
      resource: 'course',
      page,
      size,
    });
  },

  async getAssignmentComments({ page, size = 16 }) {
    return this.__getComments({
      resource: 'assignment',
      page,
      size,
    });
  },

  async getSolutionComments({ page, size = 16 }) {
    return this.__getComments({
      resource: 'solution',
      page,
      size,
    });
  },
};
