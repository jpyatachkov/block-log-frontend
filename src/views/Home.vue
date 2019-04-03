<template>
  <div class="Home__container height-100">
    <blk-logo class="Home__logo mt-1 mb-3" />
    <h1>BlockLog - ни строчки кода</h1>

    <div class="Home__actions">
      <blk-button
      block
      round
      variant="primary"
      @click="$router.push({ name: 'my_courses' })"
      >
        Начать работу
      </blk-button>
    </div>

    <div class="Home__download">
      <h2>Скачать</h2>

      <div class="Home__os-cards">
        <blk-card
        class="Home__os-card"
        hoverable
        @click="onWindowsDownload"
        >
          <div
          id="Home__win"
          slot="image"
          class="p-4"
          >
            <img
            class="Home__os-icon"
            src="@/assets/win.png"
            >
          </div>

          <h3 class="mt-3 text-center">
            Windows
          </h3>
        </blk-card>

        <blk-card
        class="Home__os-card"
        hoverable
        @click="onDarwinDownload"
        >
          <div
          id="Home__darwin"
          slot="image"
          class="p-4"
          >
            <img
            class="Home__os-icon"
            src="@/assets/darwin.png"
            >
          </div>

          <h3 class="mt-3 text-center">
            macOS
          </h3>
        </blk-card>
      </div>
    </div>
  </div>
</template>

<script>
import { EmptyLayoutMixin } from '@/mixins';

export default {
  name: 'Home',

  mixins: [EmptyLayoutMixin],

  methods: {
    goToDownloadLink(buildName) {
      const downloadLink = `${
        process.env.VUE_APP_DOWNLOAD_BASE_URL
      }/${buildName}`;
      window.location = downloadLink;
    },

    onDarwinDownload() {
      this.goToDownloadLink('block-log-darwin-x64.zip');
    },

    onWindowsDownload() {
      this.goToDownloadLink('block-log-win32-x64.zip');
    },
  },
};
</script>

<style lang="scss" scoped>
#Home__win {
  max-height: 200px;
  max-width: 200px;
}

#Home__darwin {
  max-height: 200px;
  max-width: 200px;
}

.Home__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.Home__logo {
  max-height: 200px;
  max-width: 200px;
}

.Home__actions {
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Home__download {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.Home__os-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
}

.Home__os-card {
  margin: 15px;
}

.Home__os-icon {
  width: 100%;
  height: auto;
}
</style>
