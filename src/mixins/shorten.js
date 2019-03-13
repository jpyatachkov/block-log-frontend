export default {
  methods: {
    /**
     * @param {?string} content
     * @param {number} length
     */
    shorten(content, length) {
      content = content || '';

      if (length > content.length) {
        return content;
      } else {
        return `${content.slice(0, length)}...`;
      }
    },
  },
};
