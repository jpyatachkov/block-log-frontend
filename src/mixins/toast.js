import bus, { EVENTS } from '@/bus';

export default {
  data: () => ({
    duration: 6000,
    position: 'top-center',
  }),

  created() {
    bus.$on(EVENTS.SHOW_TOAST, this.onShowToast);
  },

  destroyed() {
    bus.$off(EVENTS.SHOW_TOAST, this.onShowToast);
  },

  methods: {
    onShowToast({ message, isCorrect = true }) {
      this.$toasted.show(message, {
        duration: this.duration,
        position: this.position,
        theme: this.resolveTheme(isCorrect),
      });
    },

    resolveTheme(isCorrect) {
      return isCorrect ? 'outline' : 'bubble';
    },
  },
};
