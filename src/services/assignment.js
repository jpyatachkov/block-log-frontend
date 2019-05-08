import HttpService from './http';
import RouteService from './route';

export default {
  ...HttpService,
  ...RouteService,

  async getAssignments({ courseId, page, size = 50 }) {
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

  async getAssignment({ courseId, assignmentId }) {
    const url = this.assignmentRoute(courseId, assignmentId);
    const response = await this.doGet({ url });
    return response.data;
  },

  async createAssignment({ courseId, assignment }) {
    const url = this.assignmentsRoute(courseId);
    const data = {
      assignment,
    };

    const response = await this.doPost({
      url,
      data,
    });

    return response.data;
  },

  async updateAssignment({ courseId, assignmentId, assignment }) {
    const url = this.assignmentRoute(courseId, assignmentId);
    const data = {
      assignment,
    };

    const response = await this.doPatch({
      url,
      data,
    });

    return response.data;
  },

  async deleteAssignment({ courseId, assignmentId }) {
    const url = this.assignmentRoute(courseId, assignmentId);
    const response = await this.doDelete({ url });
    return response.data;
  },
};
