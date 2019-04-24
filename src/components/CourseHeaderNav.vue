<template>
  <nav
  class="CourseHeaderNav"
  :class="additionalClasses"
  @click.native="onClick"
  >
    {{ text }}
  </nav>
</template>

<script>
export default {
  name: 'CourseHeaderNav',

  props: {
    active: {
      default: false,
      type: Boolean,
    },
    index: {
      required: true,
      type: Number,
    },
    name: {
      required: true,
      type: String,
    },

    text: {
      required: true,
      type: String,
    },
  },

  computed: {
    additionalClasses() {
      return {
        'CourseHeaderNav--active': this.active,
      };
    },
  },

  mounted() {
    this.$el.addEventListener('click', this.onClick);
  },

  destroyed() {
    this.$el.removeEventListener('click', this.onClick);
  },

  methods: {
    onClick() {
      this.$emit('click', this.index);
    },
  },
};
</script>

<style lang="scss" scoped>
.CourseHeaderNav {
  padding: 5px;
  border: solid 1px #ffffff;
  border-bottom: none;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  cursor: pointer;

  color: white;
  background-color: transparent;

  &--active {
    color: black;
    background-color: #ffffff;
  }
}
</style>
