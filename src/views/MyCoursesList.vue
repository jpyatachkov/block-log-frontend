<template>
  <div class="d-flex flex-column justify-content-start align-items-start pt-4">
    <h5 class="text-bold">
      Активные курсы
    </h5>

    <courses-grid
    :courses="active"
    :loading="loading"
    class="pt-4 width-100"
    >
      <app-card
      slot="no-items"
      :hoverable="false"
      class="text-center"
      title="Пока Вы не проходите ни один курс."
      >
        <app-card-text>
          Нажмите
          <router-link :to="{ name: 'courses' }">
            здесь
          </router-link>, чтобы посмотреть список всех курсов.
        </app-card-text>
      </app-card>
    </courses-grid>

    <div
    v-if="showMoreActive"
    class="pt-3 width-100 d-flex justify-content-end align-items-center"
    >
      <blk-button
      round
      variant="primary"
      @click="$router.push({ name: 'my_courses_active' })"
      >
        Все активные курсы
      </blk-button>
    </div>

    <h5 class="pt-5 text-bold">
      Пройденные курсы
    </h5>

    <courses-grid
    :courses="inactive"
    :loading="loading"
    class="pt-4 width-100"
    >
      <app-card
      slot="no-items"
      :hoverable="false"
      class="text-center"
      title="Пока Вы не прошли ни один курс."
      >
        <app-card-text>
          Нажмите
          <router-link :to="{ name: 'courses' }">
            здесь
          </router-link>, чтобы посмотреть список всех курсов.
        </app-card-text>
      </app-card>
    </courses-grid>

    <div
    v-if="showMoreInactive"
    class="pt-3 width-100 d-flex justify-content-end align-items-center"
    >
      <blk-button
      round
      variant="primary"
      @click="$router.push({ name: 'my_courses_inactive' })"
      >
        Все пройденные курсы
      </blk-button>
    </div>
  </div>
</template>

<script>
import { FetchResourceMixin, LoadingMixin, MainLayoutMixin } from '@/mixins';
import { coursesComputed, coursesMethods } from '@/store/helpers';

import CoursesGrid from '@/components/CoursesGrid';

const MY_COURSES_PREVIEW_COUNT = 4;

export default {
  name: 'CourseList',

  components: {
    CoursesGrid,
  },

  mixins: [FetchResourceMixin, LoadingMixin, MainLayoutMixin],

  computed: {
    ...coursesComputed,

    active() {
      return this.myActiveCourses
        ? this.myActiveCourses.slice(0, MY_COURSES_PREVIEW_COUNT)
        : [];
    },

    inactive() {
      return this.myInactiveCourses
        ? this.myInactiveCourses.slice(0, MY_COURSES_PREVIEW_COUNT)
        : [];
    },

    showMoreActive() {
      return this.myActiveCourses.length > MY_COURSES_PREVIEW_COUNT;
    },

    showMoreInactive() {
      return this.myInactiveCourses.length > MY_COURSES_PREVIEW_COUNT;
    },
  },

  methods: {
    ...coursesMethods,

    async doFetch() {
      this.setLoading(true);
      await this.getMyActiveCourses({ page: 1 });
      await this.getMyInactiveCourses({ page: 1 });
      this.setLoading(false);
    },
  },
};
</script>
