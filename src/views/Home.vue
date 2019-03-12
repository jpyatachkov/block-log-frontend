<template>
  <p>Hello</p>
</template>

<script>
import layoutNames from '@/layouts';
import { mapMutations } from 'vuex';

export default {
  name: 'Home',

  mounted() {
    this.setLayout(layoutNames.MAIN_LAYOUT);
  },

  methods: {
    ...mapMutations(['setLayout']),
  },
};
</script>
