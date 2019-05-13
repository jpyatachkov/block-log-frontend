<template>
  <app-card
  :title="title"
  :img-src="avatar"
  class="CourseCard text-center"
  :subtitle="author"
  @click.native="onCardClick"
  >
    <app-card-text>
      {{ shortDescription }}
    </app-card-text>

    <div
    v-if="$route.name == 'my_courses' && !userIsStaff"
    class="mt-auto d-flex justify-content-center align-items-center"
    >
      <blk-button
      v-if="!!course.countAssignments"
      variant="success"
      @click.stop="onCourseProgressClick"
      >
        Продолжить
      </blk-button>
    </div>
  </app-card>
</template>

<script>
import { CoursePermissionsMixin, ShortenMixin } from '@/mixins';
import {
  accountComputed,
  assignmentsMethods,
  coursesMethods,
} from '@/store/helpers';

import { AccountService } from '@/services';

export default {
  name: 'CourseCard',

  mixins: [CoursePermissionsMixin, ShortenMixin],

  props: {
    course: {
      required: true,
      type: Object,
    },
    isEditMode: {
      default: false,
      type: Boolean,
    },
    preview: {
      default: true,
      type: Boolean,
    },
  },

  computed: {
    ...accountComputed,

    author() {
      return this.course.user
        ? `${this.course.user.firstName} ${this.course.user.lastName}`
        : '';
    },

    avatar() {
      return this.course.avatarBase64 || require('@/assets/default.png');
    },

    classes() {
      return {
        pointer: this.preview,
      };
    },

    shortDescription() {
      return this.preview
        ? this.shorten(this.course.shortDescription, 90)
        : this.course.shortDescription;
    },

    enrollButtonText() {
      return AccountService.userIsStaff()
        ? 'Преподавать курс'
        : 'Записаться на курс';
    },

    title() {
      return this.preview
        ? this.shorten(this.course.title, 35)
        : this.course.title;
    },
  },

  methods: {
    ...assignmentsMethods,
    ...coursesMethods,

    onCardClick() {
      if (this.preview) {
        const id = this.course.id;
        this.$router.push({ name: 'course', params: { id } });
      }
    },

    onCourseProgressClick() {
      this.clearAssignments();
      this.$router.push({
        name: 'course_progress',
        params: { courseId: this.course.id, id: -1 },
      });
    },

    onEditButtonClick() {
      this.$emit('edit', !this.isEditMode);
    },

    async onEnrollClick() {
      const courseId = this.$route.params.id;
      await this.enrollCourse({ courseId });

      // Нужно для того, чтобы список курсов обновился.
      // Если этого не сделать, то при переходе на страницу моих курсов или курсов в целом
      // не будет запроса к API (т.к. мы кэшируем извлеченные данные, чтобы не делать лишних запросов),
      // соответственно, нужно будет обновлять страницу вручную, чтобы увидеть созданный курс.
      this.clearMyCourses();
    },
  },
};
</script>

<style lang="scss" scoped>
.CourseCard {
  height: 450px;
}
</style>
