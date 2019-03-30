import { coursePermissions } from '@/store/helpers';

export default {
  computed: {
    ...coursePermissions,

    userCanEdit() {
      return (
        this.userIsEnrolled && (this.userIsCollaborator || this.userIsModerator)
      );
    },

    userCanEnroll() {
      return !this.userIsEnrolled;
    },
  },
};
