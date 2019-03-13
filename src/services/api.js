import AccountService from './account';
import AssignmentService from './assignment';
import CourseService from './course';

export default {
  ...AccountService,
  ...AssignmentService,
  ...CourseService,
};
