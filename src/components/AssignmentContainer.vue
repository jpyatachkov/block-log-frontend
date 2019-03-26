<template>
  <assignment-form
  ref="form"
  :loading="loading"
  :update="update"
  @submit="onSubmit"
  />
</template>

<script>
import { assignmentsComputed, assignmentsMethods } from '@/store/helpers';

import AssignmentForm from './AssignmentForm';
import { LoadingMixin } from '@/mixins';

export default {
  name: 'AssignmentContainer',

  components: {
    AssignmentForm,
  },

  mixins: [LoadingMixin],

  props: {
    update: {
      default: false,
      type: Boolean,
    },
  },

  computed: {
    ...assignmentsComputed,
  },

  async mounted() {
    if (this.update) {
      if (this.assignmentFormUnsaved) {
        this.setFormData(this.assignmentForm);
      } else {
        const courseId = this.$route.params.courseId;
        const assignmentId = this.$route.params.id;

        const assignmentForm = await this.getAssignment({
          courseId,
          assignmentId,
        });

        this.setFormData(assignmentForm);
      }
    }
  },

  methods: {
    ...assignmentsMethods,

    async onSubmit(assignment) {
      this.setLoading(true);
      this.$refs.form.clearErrors();

      const courseId = this.$route.params.courseId;

      try {
        if (this.update) {
          const assignmentId = this.$route.params.id;
          await this.updateAssignment({ courseId, assignmentId, assignment });
        } else {
          await this.createAssignment({ courseId, assignment });
        }

        this.$router.push({ name: 'course', params: { id: courseId } });
      } catch (error) {
        this.$refs.form.mapBackendErrorsToFields(error);
      } finally {
        this.setLoading(false);
      }
    },

    setFormData(form) {
      if (this.$refs.form) {
        this.$refs.form.setFormData(form);
      }
    },
  },
};
</script>
