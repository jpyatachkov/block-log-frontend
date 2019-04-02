<template>
  <div>
    <blk-card-header>
      {{ title }}
    </blk-card-header>

    <assignment-form
    ref="form"
    :loading="loading"
    :update="update"
    @submit="onSubmit"
    />
  </div>
</template>

<script>
import { assignmentsComputed, assignmentsMethods } from '@/store/helpers';

import AssignmentForm from './AssignmentForm';
import { EditorService } from '@/services';
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

    title() {
      return this.update ? 'Изменение задания' : 'Создание задания';
    },
  },

  async mounted() {
    if (this.assignmentFormUnsaved) {
      const program = EditorService.getProgram();

      this.setFormData({
        ...this.assignmentForm,
        program,
      });
    } else if (this.update) {
      const courseId = this.$route.params.courseId;
      const assignmentId = this.$route.params.id;

      const assignmentForm = await this.getAssignment({
        courseId,
        assignmentId,
      });

      this.setFormData(assignmentForm);
    }
  },

  methods: {
    ...assignmentsMethods,

    async onSubmit(assignment) {
      this.setLoading(true);
      this.$refs.form.clearErrors();

      const courseId = this.$route.params.courseId;

      assignment.program = EditorService.getProgram() || assignment.program;

      try {
        let id;

        if (this.update) {
          const assignmentId = this.$route.params.id;
          id = await this.updateAssignment({
            courseId,
            assignmentId,
            assignment,
          });
        } else {
          id = await this.createAssignment({ courseId, assignment });
        }

        this.$router.push({
          name: 'assignment',
          params: { courseId: courseId, id },
        });
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
