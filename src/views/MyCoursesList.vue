<template>
  <courses-grid
  :courses="myCourses"
  :loading="loading"
  @fetch="doFetch"
  >
    <div
    slot="no-items"
    class="text-center"
    >
      <h3 slot="no-items">
        Вы пока не записаны ни на один курс.
      </h3>

      <h5>
        Нажмите <router-link :to="{ name: 'courses' }">
          здесь
        </router-link>,
        чтобы посмотреть список всех курсов.
      </h5>
    </div>
  </courses-grid>
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
