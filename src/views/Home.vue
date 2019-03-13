<template>
  <p>Hello</p>
</template>

<script>
import layoutNames from '@/layouts';
import { rootMethods } from '@/store/helpers';

export default {
  name: 'Home',

  mounted() {
    this.setLayout(layoutNames.MAIN_LAYOUT);
  },

  methods: {
    ...rootMethods,
  },
};
</script>
