<template>
  <div
  class="CourseHeader__container"
  :class="additionalClasses"
  >
    <div class="CourseHeader__row container">
      <course-avatar
      :src="avatar"
      class="CourseHeader__avatar"
      />

      <h2 class="CourseHeader__title text-overflow-ellipsis">
        {{ title }}
      </h2>

      <course-header-button
      v-if="!update"
      class="ml-auto"
      />
    </div>

    <div class="container mt-auto">
      <course-header-navs
      :navs="displayNavs"
      @change-active="onNavChange"
      />
    </div>
  </div>
</template>

<script>
import CourseAvatar from './CourseAvatar';
import CourseHeaderButton from './CourseHeaderButton';
import CourseHeaderNavs from './CourseHeaderNavs';

export default {
  name: 'CourseHeader',

  components: {
    CourseAvatar,
    CourseHeaderButton,
    CourseHeaderNavs,
  },

  props: {
    avatar: {
      default: null,
      validator: (v) => !v || v instanceof String || typeof v === 'string',
    },
    title: {
      required: true,
      validator: (v) => !v || v instanceof String || typeof v === 'string',
    },
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
    additionalClasses() {
      return {
        'CourseHeader__container--base': !this.update,
        'CourseHeader__container--edit': this.update,
      };
    },

    displayNavs() {
      let navs;

      if (this.update) {
        navs = this.navs.filter(({ name }) => name === 'info');
      } else {
        navs = this.navs;
      }

      return navs;
    },
  },

  methods: {
    onNavChange({ oldIndex, newIndex }) {
      this.navs[oldIndex].active = false;
      this.navs[newIndex].active = true;

      this.$emit('nav-changed', newIndex);
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

  &__avatar {
    margin-top: 27px;
  }

  &__row {
    margin-top: 25px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }

  &__title {
    margin-left: 50px;
  }
}
</style>
