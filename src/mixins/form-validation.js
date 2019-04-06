import { capitalize, deepCopy } from '@/utils/helpers';

import Vue from 'vue';

export default {
  data: () => ({
    fieldErrors: {},
  }),

  methods: {
    clearErrors() {
      this.validation.reset();
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

      const copy = deepCopy(this.form);
      this.$emit('submit', copy);
    },

    pushFieldError(fieldName, errorContent) {
      if (!this.fieldErrors[fieldName]) {
        Vue.set(this.fieldErrors, fieldName, []);
      }

      this.fieldErrors[fieldName].push(errorContent);
    },
  },
};
