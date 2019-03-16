import AccountService from './account';
import AssignmentService from './assignment';
import CommentService from './comment';
import CourseService from './course';

export default {
  ...AccountService,
  ...AssignmentService,
  ...CommentService,
  ...CourseService,
};
