<template>
  <component :is="currentLayout" />
</template>

<script>
import { mapMutations, mapState } from 'vuex';

import MainLayout from '@/components/MainLayout';
import SimpleLayout from '@/components/SimpleLayout';
import layoutNames from '@/layouts';

export default {
  name: 'App',

  components: {
    MainLayout,
    SimpleLayout,
  },

  computed: {
    ...mapState(['layout']),

    currentLayout() {
      switch (true) {
        case this.layout === layoutNames.MAIN_LAYOUT:
          return MainLayout;
        case this.layout === layoutNames.SIMPLE_LAYOUT:
          return SimpleLayout;
        default:
          return MainLayout;
      }
    },
  },

  mounted() {
    window.addEventListener('online', this.updateOnline);
    window.addEventListener('offline', this.updateOnline);
  },

  destroyed() {
    window.removeEventListener('online', this.updateOnline);
    window.removeEventListener('offline', this.updateOnline);
  },

  methods: {
    ...mapMutations(['setOnline']),

    updateOnline(evt) {
      const { type } = evt;
      this.setOnline(type === 'online');
    },
  },
};
</script>
