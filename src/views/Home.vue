<template>
  <div>
    <vs-row
    class="mb-2"
    vs-align="center"
    vs-type="flex"
    vs-justify="flex-end"
    vs-w="12"
    >
      <z-button
      class="mr-2 Course__button"
      color="primary"
      size="large"
      >
        Новый курс
      </z-button>
    </vs-row>

    <vs-tabs vs-alignment="fixed">
      <vs-tab
      class="Home__tabs-content"
      vs-label="Мои курсы"
      >
        <vs-row vs-w="12">
          <courses-grid />
        </vs-row>
      </vs-tab>

      <vs-tab
      class="Home__tabs-content"
      vs-label="Все курсы"
      >
        <courses-grid />
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
import CoursesGrid from '@/components/CoursesGrid';
import ZButton from '@/components/ZButton';
import layoutNames from '@/layouts';
import { rootMethods } from '@/store/helpers';

export default {
  name: 'Home',

  components: {
    CoursesGrid,
    ZButton,
  },

  mounted() {
    this.setLayout(layoutNames.MAIN_LAYOUT);
  },

  methods: {
    ...rootMethods,
  },
};
</script>

<style lang="stylus" scoped>
.Home__tabs-content
  padding-left 0
  padding-right 0
</style>
