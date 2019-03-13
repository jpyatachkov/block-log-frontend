export default {
  watch: {
    loading() {
      if (this.loading) {
        this.startLoading();
      } else {
        this.stopLoading();
      }
    },
  },

  methods: {
    startLoading() {
      const loadingConfig = this.loadingConfig || {};

      loadingConfig.elementIds.forEach((container) => {
        this.$vs.loading({
          container,
          scale: loadingConfig.scale || 1,
          type: loadingConfig.type || 'default',
        });
      });
    },

    stopLoading() {
      const loadingConfig = this.loadingConfig || {};

      loadingConfig.elementIds.forEach((container) => {
        this.$vs.loading.close(`${container} > .con-vs-loading`);
      });
    },
  },
};
