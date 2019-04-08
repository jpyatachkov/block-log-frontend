<template>
  <blk-card
  :class="classes"
  :hoverable="preview"
  @click.native="onCardClick"
  >
    <blk-card-header>
      {{ title }}

      <div
      v-if="!preview"
      slot="link-back"
      class="mb-2"
      >
        <router-link :to="{ name: 'my_courses' }">
          К моим курсам
        </router-link>
      </div>
    </blk-card-header>

    <p>{{ description }}</p>

    <b-row class="mt-3">
      <b-col
      md="8"
      lg="9"
      />

      <b-col
      xs="12"
      md="4"
      lg="3"
      >
        <blk-card-actions v-if="!preview">
          <blk-button
          v-if="userCanEnroll"
          block
          round
          variant="primary"
          @click="onEnrollClick"
          >
            Записаться
          </blk-button>
          <div
          v-else-if="userCanEdit"
          class="d-flex fill-width"
          >
            <blk-button
            block
            round
            variant="outline-primary"
            @click="onEditButtonClick"
            >
              {{ isEditMode ? 'Просмотр' : 'Редактирование' }}
            </blk-button>
          </div>
        </blk-card-actions>
      </b-col>
    </b-row>
  </blk-card>
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

    description() {
      let description;

      if (this.preview) {
        description = this.shorten(this.course.shortDescription, 100);
      } else {
        description = this.course.description;
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
