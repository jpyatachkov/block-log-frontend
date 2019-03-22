import { capitalize } from '@/utils/helpers';

export default {
  data: () => ({
    fieldErrors: {},
  }),

  methods: {
    clearErrors() {
      this.fieldErrors = {};
    },

    getFieldErrors(fieldName) {
      return [
        ...this.validation.allErrors(fieldName),
        ...(this.fieldErrors[fieldName] || []),
      ];
    },

    mapBackendErrorsToFields(thrownError, prefix = 'form.') {
      const errors = thrownError.response.data.errors;
      Object.entries(errors).forEach(([field, fieldErrors]) => {
        fieldErrors.forEach((error) =>
          this.pushFieldError(`${prefix}${field}`, capitalize(error)),
        );
      });
    },

    async onSubmit() {
      const isValid = await this.$validate();

      if (!isValid) {
        return;
      }

      this.$emit('submit', this.form);
    },

    pushFieldError(fieldName, errorContent) {
      if (!this.fieldErrors[fieldName]) {
        this.fieldErrors[fieldName] = [];
      }

      this.fieldErrors[fieldName].push(errorContent);
    },
  },
};
