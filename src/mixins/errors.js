/**
 * Примесь для обработки общих ошибок формы.
 */
export default {
  data: () => ({
    errors: [],
  }),

  methods: {
    clearErrors() {
      this.errors = [];
    },

    pushError(errorContent) {
      this.errors.push({
        content: errorContent,
        show: true,
      });
    },
  },
};
