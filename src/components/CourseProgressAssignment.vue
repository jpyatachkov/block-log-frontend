<template>
  <div class="CourseProgressAssignment">
    <div class="CourseProgressAssignment__number mr-auto">
      {{ number }}
    </div>

    {{ text }}

    <div
    v-if="active"
    class="CourseProgressAssignment__triangle"
    />
  </div>
</template>

<script>
export default {
  name: 'CourseProgressAssignment',

  props: {
    active: {
      default: false,
      type: Boolean,
    },
    number: {
      required: true,
      type: Number,
    },
    text: {
      required: true,
      type: String,
    },
  },

  mounted() {
    this.$el.addEventListener('click', this.onClick);
  },

  destroyed() {
    this.$el.addEventListener('click', this.onClick);
  },

  methods: {
    onClick() {
      this.$emit('current-assignment-changed', this.number);
    },
  },
};
</script>

<style lang="scss" scoped>
.CourseProgressAssignment {
  display: flex;
  color: white;
  padding-top: 5px;
  padding-bottom: 5px;

  &--active {
    background-color: #24be74;
  }

  &__number {
    background-color: white;
    color: black;
    border-radius: 6px;
  }

  &__triangle {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;

    border-right: 10px solid white;
  }
}
</style>
