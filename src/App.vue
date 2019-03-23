<template>
  <component :is="currentLayout" />
</template>

<script>
import { rootComputed, rootMethods } from '@/store/helpers';

import EmptyLayout from '@/components/EmptyLayout';
import MainLayout from '@/components/MainLayout';
import SimpleLayout from '@/components/SimpleLayout';
import layoutNames from '@/layouts';

export default {
  name: 'App',

  components: {
    EmptyLayout,
    MainLayout,
    SimpleLayout,
  },

  computed: {
    ...rootComputed,

    currentLayout() {
      switch (true) {
        case this.layout === layoutNames.EMPTY_LAYOUT:
          return EmptyLayout;
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
    ...rootMethods,

    updateOnline(evt) {
      const { type } = evt;
      this.setOnline(type === 'online');
    },
  },
};
</script>
