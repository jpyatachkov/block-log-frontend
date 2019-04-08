<template>
  <div class="bg-native">
    <div
    v-if="iframeLoading"
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
import { rootComputed, rootMethods } from '@/store/helpers';

import MainLayoutContent from './MainLayoutContent';
import MainLayoutNavBar from './MainLayoutNavBar';

export default {
  name: 'MainLayout',

  components: {
    MainLayoutContent,
    MainLayoutNavBar,
  },

  computed: {
    ...rootComputed,
  },

  created() {
    console.log('IFRAME LOADED');
    bus.$on(EVENTS.IFRAME_LOADED, this.onIframeLoaded);
  },

  destroyed() {
    bus.$off(EVENTS.IFRAME_LOADED, this.onIframeLoaded);
  },

  methods: {
    ...rootMethods,

    onIframeLoaded() {
      this.setIframeLoading(false);
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
