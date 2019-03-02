const RouteService = {
  registerRoute: () => 'users/register',
  jwtRoute: () => 'user_token',

  coursesRoute: () => 'courses',
  courseRoute: (courseId) => `courses/${courseId}`,

  assignmentsRoute: () => 'assignments',
  assignmentRoute: (assignmentId) => `assignments/${assignmentId}`,
};

export default RouteService;
