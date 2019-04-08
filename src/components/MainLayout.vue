<template>
  <div class="bg-native">
    <div
    v-if="iframeIsLoading"
    class="MainLayout__loader height-100 fill-height"
    >
      <blk-loader />
    </div>
    <main
    v-else
    class="height-100 fill-height"
    >
      <main-layout-nav-bar />
      <main-layout-content />
    </main>
  </div>
</template>

<script>
import bus, { EVENTS } from '@/bus';

import MainLayoutContent from './MainLayoutContent';
import MainLayoutNavBar from './MainLayoutNavBar';

export default {
  name: 'MainLayout',

  components: {
    MainLayoutContent,
    MainLayoutNavBar,
  },

  data: () => ({
    iframeIsLoading: true,
  }),

  created() {
    bus.$on(EVENTS.IFRAME_LOADED, this.onIframeLoaded);
  },

  destroyed() {
    bus.$off(EVENTS.IFRAME_LOADED, this.onIframeLoaded);
  },

  methods: {
    onIframeLoaded() {
      this.iframeIsLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.MainLayout__loader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
