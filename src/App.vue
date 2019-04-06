<template>
  <div class="fill-height height-100">
    <component
    :is="currentLayout"
    class="height-100"
    />

    <editor-iframe />
  </div>
</template>

<script>
import { rootComputed, rootMethods } from '@/store/helpers';

import EditorIframe from '@/components/EditorIframe';
import EmptyLayout from '@/components/EmptyLayout';
import MainLayout from '@/components/MainLayout';
import SimpleLayout from '@/components/SimpleLayout';
import { ToastMixin } from '@/mixins';
import layoutNames from '@/layouts';

export default {
  name: 'App',

  components: {
    EditorIframe,
    EmptyLayout,
    MainLayout,
    SimpleLayout,
  },

  mixins: [ToastMixin],

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
