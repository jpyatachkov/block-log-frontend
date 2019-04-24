<template>
  <div>
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
      <slot />
    </main>
  </div>
</template>

<script>
import MainLayoutNavBar from './MainLayoutNavBar';
import { rootComputed } from '@/store/helpers';

export default {
  name: 'BaseLayout',

  components: {
    MainLayoutNavBar,
  },

  computed: {
    ...rootComputed,
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
