<template>
  <div
  class="CourseHeader__container"
  :class="additionalClasses"
  >
    <div class="CourseHeader__row container mb-3">
      <course-avatar
      :src="avatar"
      class="CourseHeader__avatar"
      />

      <h2 class="break-all mt-2">
        {{ title }}
      </h2>

      <course-header-button
      :update="update"
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
import { assignmentsComputed, coursePermissions } from '@/store/helpers';

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
    ...assignmentsComputed,
    ...coursePermissions,

    additionalClasses() {
      return {
        'CourseHeader__container--base': !this.update,
        'CourseHeader__container--edit': this.update,
      };
    },

    displayNavs() {
      let navs;

      if (
        this.update ||
        (!this.hasAssignments && !this.userCanCreateAssignments)
      ) {
        navs = this.navs.filter(({ name }) => name === 'info');
      } else {
        navs = this.navs;
      }

      return navs;
    },

    hasAssignments() {
      return !!(this.assignments || []).length;
    },

    userCanCreateAssignments() {
      return this.userIsCollaborator || this.userIsModerator;
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
    margin-right: 50px;
  }

  &__row {
    margin-top: 25px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
