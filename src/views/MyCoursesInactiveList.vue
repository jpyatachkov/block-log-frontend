<template>
  <div class="d-flex flex-column justify-content-start align-items-start pt-4">
    <h5 class="text-bold">
      Пройденные курсы
    </h5>

    <courses-grid
    :courses="myInactiveCourses"
    :loading="loading"
    class="pt-4 width-100"
    @fetch="doFetch"
    >
      <app-card
      slot="no-items"
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
  </div>
</template>

<script>
import { FetchResourceMixin, LoadingMixin, MainLayoutMixin } from '@/mixins';
import { coursesComputed, coursesMethods } from '@/store/helpers';

import CoursesGrid from '@/components/CoursesGrid';

export default {
  name: 'MyCoursesInactiveList',

  components: {
    CoursesGrid,
  },

  mixins: [FetchResourceMixin, LoadingMixin, MainLayoutMixin],

  computed: {
    ...coursesComputed,
  },

  methods: {
    ...coursesMethods,

    async doFetch({ page = 1 } = {}) {
      this.setLoading(true);
      await this.getMyInactiveCourses({ page });
      this.setLoading(false);
    },
  },
};
</script>
