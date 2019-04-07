<template>
  <iframe
  ref="iframe"
  :src="src"
  class="EditorIframe"
  @load="onIframeLoad"
  />
</template>

<script>
import { assignmentsComputed, solutionsComputed } from '@/store/helpers';
import bus, { EVENTS } from '@/bus';

import { EditorService } from '@/services';
import { LOCAL_STORAGE_KEYS } from '@/services/editor';

const ACTION_TYPES = {
  LOAD: 'LOAD',
  REMOVE: 'REMOVE',
  REMOVE_BEFOREUNLOAD: 'REMOVE_BEFOREUNLOAD',
  SAVE: 'SAVE',
};

export default {
  name: 'EditorIframe',

  data: () => ({
    src: process.env.VUE_APP_EDITOR_REDIRECT_URL,
  }),

  computed: {
    ...assignmentsComputed,
    ...solutionsComputed,
  },

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
      this.postMessage({
        action: ACTION_TYPES.REMOVE_BEFOREUNLOAD,
      });
      // Если пользователь решал задачу или редактировал/создавал задание,
      // мы будем проверять, что работа с редактором завершена.
      if (this.solutionSent || this.assignmentFormUnsaved) {
        EditorService.checkEditorIsActive();
      }
    },

    onIframeMessage(evt) {
      const { action, key, value } = evt.data;

      if (action === ACTION_TYPES.LOAD) {
        EditorService.__set(key, value);

        if (key === LOCAL_STORAGE_KEYS.PROGRAM) {
          // Нужно из-за того, что тестирование можно запускать
          // только после того, как из iframe будет извлечена программа.
          bus.$emit(EVENTS.PROGRAM_LOADED);
        } else if (
          key === LOCAL_STORAGE_KEYS.EDITOR_ACTIVE_KEY &&
          !EditorService.editorIsActive()
        ) {
          // Если EDITOR_ACTIVE_KEY === false, то пользователь нажал на кнопку "Загрузить решение"
          // и хочет, чтобы с его решением работали. В этом случае мы запускаем метод извлечения программы.
          // Иначе ничего не делаем.
          bus.$emit(EVENTS.WAIT_PROGRAM_TO_TEST);
          EditorService.fetchProgram();
        }
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
