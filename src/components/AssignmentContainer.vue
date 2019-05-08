<template>
  <div class="container-fluid">
    <assignment-form
    ref="form"
    :loading="loading"
    :update="update"
    @close-edit-mode="$emit('hide')"
    @submit="onSubmit"
    />
  </div>
</template>

<script>
import { assignmentsComputed, assignmentsMethods } from '@/store/helpers';
import eventBus, { EVENTS } from '@/bus';

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
    assignmentId: {
      required: true,
      validator: (v) =>
        v instanceof Number ||
        typeof v === 'number' ||
        v instanceof String ||
        typeof v === 'string',
    },
    update: {
      default: false,
      type: Boolean,
    },
  },

  computed: {
    ...assignmentsComputed,
  },

  async mounted() {
    /* if (this.assignmentFormUnsaved) {
      const program = EditorService.getProgram();

      this.setFormData({
        ...this.assignmentForm,
        program,
      });
    } else */ if (
      this.update
    ) {
      const courseId = this.$route.params.id;
      const assignmentId = this.assignmentId;

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

      const courseId = this.$route.params.id;

      assignment.program = EditorService.getProgram();
      assignment.tests = assignment.tests.map((test) => ({
        inputArray: test.inputArray.trim().split(/\s+/),
        outputArray: test.outputArray.trim().split(/\s+/),
      }));

      try {
        if (this.update) {
          const assignmentId = this.assignmentId;
          await this.updateAssignment({
            courseId,
            assignmentId,
            assignment,
          });
          eventBus.$emit(EVENTS.SHOW_TOAST, {
            message: 'Задача успешно обновлена',
          });
        } else {
          await this.createAssignment({ courseId, assignment });
        }

        this.$refs.form.clearEditor();
        this.$emit('hide');
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
