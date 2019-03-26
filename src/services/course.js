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

  async getMyCourses({ page, size = 16 }) {
    const url = this.myCoursesRoute();
    const response = await this.doGet({
      url,
      params: { page, size },
    });
    return response.data;
  },

  async getCourse({ courseId }) {
    const url = this.courseRoute(courseId);
    const response = await this.doGet({ url });
    return response.data;
  },

  async createCourse({ course }) {
    const url = this.coursesRoute();
    const data = {
      course,
    };

    const response = await this.doPost({
      url,
      data,
    });

    return response.data;
  },

  async updateCourse({ courseId, course }) {
    const url = this.courseRoute(courseId);
    const data = {
      course,
    };

    const response = await this.doPatch({
      url,
      data,
    });

    return response.data;
  },

  async deleteCourse({ courseId }) {
    const url = this.courseRoute(courseId);
    const response = await this.doDelete({ url });
    return response.data;
  },
};
