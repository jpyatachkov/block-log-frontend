export default {
  async created() {
    try {
      await this.doFetch();
    } catch (err) {
      // DO NOTHING
    }
  },
};
