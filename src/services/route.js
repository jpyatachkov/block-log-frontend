export default {
  registerRoute: () => 'users/register',
  jwtRoute: () => 'user_token',

  coursesRoute: () => 'courses',
  myCoursesRoute: () => 'courses/mine',
  courseRoute: (courseId) => `courses/${courseId}`,

  assignmentsRoute: (courseId) => `courses/${courseId}/assignments`,
  assignmentRoute: (courseId, assignmentId) =>
    `courses/${courseId}/assignments/${assignmentId}`,

  solutionsRoute: (courseId, assignmentId) =>
    `courses/${courseId}/assignments/${assignmentId}/solutions`,
  solutionCreateRoute: () => 'solutions',
  solutionRoute: (solutionId) => `solutions/${solutionId}`,

  commentsRoute: () => 'comments',
  commentRoute: (commentId) => `comments/${commentId}`,
};
