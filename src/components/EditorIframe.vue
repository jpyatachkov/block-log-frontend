<template>
  <iframe
  ref="iframe"
  :src="src"
  class="EditorIframe"
  @load="onIframeLoad"
  />
</template>

<script>
import bus, { EVENTS } from '@/bus';

import { EditorService } from '@/services';

const ACTION_TYPES = {
  LOAD: 'LOAD',
  REMOVE: 'REMOVE',
  SAVE: 'SAVE',
};

export default {
  name: 'EditorIframe',

  data: () => ({
    src: process.env.VUE_APP_EDITOR_REDIRECT_URL,
  }),

  created() {
    bus.$on(EVENTS.GET_EDITOR_IFRAME_KEY, this.onGetKey);
    bus.$on(EVENTS.REMOVE_EDITOR_IFRAME_KEY, this.onRemoveKey);
    bus.$on(EVENTS.SET_EDITOR_IFRAME_KEY, this.onSetKey);

    window.addEventListener('message', this.onIframeMessage, false);
  },

  destroyed() {
    bus.$off(EVENTS.GET_EDITOR_IFRAME_KEY, this.onGetKey);
    bus.$off(EVENTS.REMOVE_EDITOR_IFRAME_KEY, this.onRemoveKey);
    bus.$off(EVENTS.SET_EDITOR_IFRAME_KEY, this.onSetKey);

    window.removeEventListener('message', this.onIframeMessage, false);
  },

  methods: {
    onGetKey({ key }) {
      this.postMessage({
        action: ACTION_TYPES.LOAD,
        key,
      });
    },

    onIframeLoad() {
      EditorService.updateLocalStorage();
    },

    onIframeMessage(evt) {
      const { action, key, value } = evt.data;

      if (action === ACTION_TYPES.LOAD) {
        EditorService.__set(key, value);
      }
    },

    onRemoveKey({ key }) {
      this.postMessage({
        action: ACTION_TYPES.REMOVE,
        key,
      });
    },

    onSetKey({ key, value }) {
      // TODO: Убрать.
      if (
        !typeof value === 'string' &&
        !(value instanceof String) &&
        value !== null
      ) {
        value = JSON.stringify(value);
      } else if (value === 'null' || value === 'undefined') {
        value = JSON.parse(value);
      }

      this.postMessage({
        action: ACTION_TYPES.SAVE,
        key,
        value,
      });
    },

    postMessage(message) {
      this.$refs.iframe.contentWindow.postMessage(message, '*');
    },
  },
};
</script>

<style lang="scss" scoped>
.EditorIframe {
  display: none;
}
</style>
