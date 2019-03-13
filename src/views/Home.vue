<template>
  <courses-grid />
</template>

<script>
import CoursesGrid from '@/components/CoursesGrid';
import layoutNames from '@/layouts';
import { rootMethods } from '@/store/helpers';

export default {
  name: 'Home',

  components: {
    CoursesGrid,
  },

  mounted() {
    this.setLayout(layoutNames.MAIN_LAYOUT);
  },

  methods: {
    ...rootMethods,
  },
};
</script>
