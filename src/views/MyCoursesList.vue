<template>
  <div class="d-flex flex-column justify-content-start align-items-start pt-4">
    <h4>Мои курсы</h4>

    <courses-grid
    :courses="myCourses"
    :loading="loading"
    class="pt-3 width-100"
    @fetch="doFetch"
    >
      <div
      slot="no-items"
      class="text-center"
      >
        <h5 slot="no-items">
          Вы пока не записаны ни на один курс.
        </h5>

        <h6>
          Нажмите
          <router-link :to="{ name: 'courses' }">
            здесь
          </router-link>, чтобы посмотреть список всех курсов.
        </h6>
      </div>
    </courses-grid>
  </div>
</template>

<script>
import { FetchResourceMixin, LoadingMixin, MainLayoutMixin } from '@/mixins';
import { coursesComputed, coursesMethods } from '@/store/helpers';

import CoursesGrid from '@/components/CoursesGrid';

export default {
  name: 'CourseList',

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
      await this.getMyCourses({ page });
      this.setLoading(false);
    },
  },
};
</script>
