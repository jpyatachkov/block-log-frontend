<template>
  <div class="d-flex flex-column justify-content-start align-items-start pt-4">
    <h5 class="text-bold">
      Доступные курсы
    </h5>

    <courses-grid
    :courses="courses"
    :loading="loading"
    class="pt-4 width-100"
    @fetch="doFetch"
    >
      <app-card
      slot="no-items"
      :hoverable="false"
      class="text-center"
      >
        <app-card-text>В системе пока нет ни одного курса.</app-card-text>
      </app-card>
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
      await this.getCourses({ page });
      this.setLoading(false);
    },
  },
};
</script>
