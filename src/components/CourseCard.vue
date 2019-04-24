<template>
  <app-card
  :title="title"
  align="center"
  :img-src="require('@/assets/default.png')"
  subtitle="Команда Block Log"
  @click.native="onCardClick"
  >
    <app-card-text>
      {{ shortDescription }}
    </app-card-text>

    <div
    v-if="$route.name == 'my_courses'"
    class="d-flex justify-content-center align-items-center"
    >
      <blk-button variant="success">
        Продолжить
      </blk-button>
    </div>
  </app-card>
</template>

<script>
import { CoursePermissionsMixin, ShortenMixin } from '@/mixins';

import { AccountService } from '@/services';
import { coursesMethods } from '@/store/helpers';

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
    classes() {
      return {
        pointer: this.preview,
      };
    },

    shortDescription() {
      let description;

      if (this.preview) {
        description = this.shorten(this.course.shortDescription, 100);
      } else {
        description = this.course.shortDescription;
      }

      return description;
    },

    enrollButtonText() {
      let text;

      if (AccountService.userIsStaff()) {
        text = 'Преподавать курс';
      } else {
        text = 'Записаться на курс';
      }

      return text;
    },

    title() {
      let title = this.course.title;

      if (this.preview) {
        title = this.shorten(title, 50);
      }

      return title;
    },
  },

  methods: {
    ...coursesMethods,

    onCardClick() {
      if (this.preview) {
        const id = this.course.id;
        this.$router.push({ name: 'course', params: { id } });
      }
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
