<template>
  <div
  class="CourseHeader__container"
  :class="additionalClasses"
  >
    <div class="CourseHeader__row container">
      <div class="CourseHeader__img-container">
        <img
        class="max-height-100 max-width-100"
        :src="require('@/assets/default.png')"
        >
      </div>

      <h2 class="CourseHeader__title text-overflow-ellipsis">
        {{ course.title }}
      </h2>

      <course-header-button class="ml-auto" />
    </div>

    <div class="container mt-auto">
      <course-header-navs
      :navs="navs"
      @change-active="onNavChange"
      />
    </div>
  </div>
</template>

<script>
import CourseHeaderButton from './CourseHeaderButton';
import CourseHeaderNavs from './CourseHeaderNavs';
import { coursesComputed } from '@/store/helpers';

export default {
  name: 'CourseHeader',

  components: {
    CourseHeaderButton,
    CourseHeaderNavs,
  },

  props: {
    update: {
      default: false,
      type: Boolean,
    },
  },

  data: () => ({
    navs: [
      {
        text: 'Информация',
        name: 'info',
        active: true,
      },
      {
        text: 'Программа',
        name: 'program',
      },
    ],
  }),

  computed: {
    ...coursesComputed,

    additionalClasses() {
      return {
        'CourseHeader__container--base': !this.update,
        'CourseHeader__container--edit': this.update,
      };
    },
  },

  methods: {
    onNavChange({ oldIndex, newIndex }) {
      this.navs[oldIndex].active = false;
      this.navs[newIndex].active = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.CourseHeader {
  &__container {
    min-height: 270px;
    backdrop-filter: blur(50px);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    &--base {
      background: linear-gradient(to bottom, #ffffff, #93c6ef);
    }

    &--edit {
      background: linear-gradient(to bottom, #ffffff, #dddddd);
    }
  }

  &__img-container {
    width: 120px;
    height: 120px;
    margin-top: 27px;
  }

  &__row {
    margin-top: 25px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
  }

  &__title {
    margin-left: 50px;
  }
}
</style>
