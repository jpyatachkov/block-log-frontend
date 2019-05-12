<template>
  <div
  ref="container"
  class="CourseProgressSidebarItem"
  :class="additionalClasses"
  >
    <div class="d-flex flex-row justify-content-start align-items-center">
      <div class="CourseProgressSidebarItem__number mr-3 pl-1 pr-2">
        {{ number + 1 }}
      </div>

      <div
      v-if="window.width >= 400"
      class="break-all"
      >
        {{ assignment.title }}
      </div>
    </div>

    <div
    v-if="active"
    class="CourseProgressSidebarItem__triangle"
    />
  </div>
</template>

<script>
export default {
  name: 'CourseProgressSidebarItem',

  props: {
    active: {
      default: false,
      type: Boolean,
    },
    assignment: {
      required: true,
      type: Object,
    },
    number: {
      required: true,
      type: Number,
    },
  },

  data: () => ({
    window: {
      width: 0,
      height: 0,
    },
  }),

  computed: {
    additionalClasses() {
      return {
        'CourseProgressSidebarItem--active': this.active,
      };
    },
  },

  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },

  mounted() {
    this.$refs.container.addEventListener('click', this.onClick);
  },

  beforeDestroy() {
    this.$refs.container.removeEventListener('click', this.onClick);
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    onClick() {
      const courseId = this.$route.params.courseId;
      const assignmentId = this.assignment.id;

      this.$router.push({
        name: 'course_progress',
        params: { courseId, id: assignmentId },
      });
    },

    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
$base-color: #297ab5;
$base-active-color: #24be74;

.CourseProgressSidebarItem {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  background-color: $base-color;

  &:hover {
    background-color: lighten($color: $base-color, $amount: 5%);
  }

  &--active {
    background-color: $base-active-color;
    border-top: 1px solid white;
    border-bottom: 1px solid white;

    &:hover {
      background-color: lighten($color: $base-active-color, $amount: 5%);
    }
  }

  &__number {
    background-color: white;
    color: black;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
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
