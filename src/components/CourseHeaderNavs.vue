<template>
  <div class="CourseHeaderNavs__container">
    <div
    v-for="(nav, key) in navs"
    :key="key"
    >
      <course-header-nav
      :active="nav.active"
      :index="key"
      :name="nav.name"
      :text="nav.text"
      @click="onNavClick"
      />
    </div>
  </div>
</template>

<script>
import CourseHeaderNav from './CourseHeaderNav';

export default {
  name: 'CourseHeaderNavs',

  components: {
    CourseHeaderNav,
  },

  props: {
    activeNav: {
      default: 0,
      type: Number,
    },
    navs: {
      required: true,
      type: Array,
    },
  },

  data: () => ({
    current: null,
  }),

  created() {
    this.current = this.activeNav;
  },

  methods: {
    onNavClick(newActiveIndex) {
      this.$emit('change-active', {
        oldIndex: this.current,
        newIndex: newActiveIndex,
      });
      this.current = newActiveIndex;
    },
  },
};
</script>

<style lang="scss" scoped>
.CourseHeaderNavs {
  &__container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
  }
}
</style>
