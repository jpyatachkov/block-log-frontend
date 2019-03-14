export default {
  registerRoute: () => 'users/register',
  jwtRoute: () => 'user_token',

  coursesRoute: () => 'courses',
  courseRoute: (courseId) => `courses/${courseId}`,

  assignmentsRoute: (courseId) => `courses/${courseId}/assignments`,
  assignmentRoute: (courseId, assignmentId) =>
    `courses/${courseId}/assignments/${assignmentId}`,

  solutionsRoute: (courseId, assignmentId) => `courses/${courseId}/assignments`,
  solutionCreateRoute: () => 'solutions',
  solutionRoute: (solutionId) => `solutions/${solutionId}`,
};
