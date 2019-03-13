export default {
  registerRoute: () => 'users/register',
  jwtRoute: () => 'user_token',

  coursesRoute: () => 'courses',
  courseRoute: (courseId) => `courses/${courseId}`,

  assignmentsRoute: (courseId) => `courses/${courseId}/assignments`,
  assignmentRoute: (assignmentId) => `assignments/${assignmentId}`,
};
