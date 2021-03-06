export default {
  registerRoute: () => 'users/register',
  jwtRoute: () => 'user_token',
  meRoute: () => 'users/me',

  coursesRoute: () => 'courses',
  myCoursesRoute: () => 'courses/mine',
  courseRoute: (courseId) => `courses/${courseId}`,
  courseEnrollRoute: (courseId) => `courses/${courseId}/enroll`,

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
