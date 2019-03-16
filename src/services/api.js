import AccountService from './account';
import AssignmentService from './assignment';
import CommentService from './comment';
import CourseService from './course';
import SolutionService from './solution';

export default {
  ...AccountService,
  ...AssignmentService,
  ...CommentService,
  ...CourseService,
  ...SolutionService,
};
