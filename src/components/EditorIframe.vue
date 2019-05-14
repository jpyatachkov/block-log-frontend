<template>
  <div>
    <iframe
    ref="iframe"
    :src="src"
    class="EditorIframe"
    @load="onIframeLoad"
    />
  </div>
</template>

<script>
import {
  assignmentsComputed,
  assignmentsMethods,
  coursesMethods,
  rootComputed,
  rootMethods,
  solutionsComputed,
  solutionsMethods,
} from '@/store/helpers';
import bus, { EVENTS } from '@/bus';

import { EditorService } from '@/services';
import { LOCAL_STORAGE_KEYS } from '@/services/editor';

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

  computed: {
    ...assignmentsComputed,
    ...rootComputed,
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

    this.setTesting(false);

    window.removeEventListener('message', this.onIframeMessage, false);
  },

  methods: {
    ...assignmentsMethods,
    ...coursesMethods,
    ...rootMethods,
    ...solutionsMethods,

    async doTests() {
      return new Promise((resolve) => {
        console.log('Worker', window.Worker);

        if (window.Worker) {
          const programToTest = EditorService.getProgram();
          const testWorker = new Worker('/test-worker.js');

          console.log('Program to test', programToTest);
          console.log({
            testsArray: this.assignment.tests,
            fileContent: programToTest,
          });

          testWorker.postMessage({
            testsArray: this.assignment.tests,
            fileContent: programToTest,
          });

          testWorker.onmessage = async (message) => {
            const { programIsCorrect } = message.data;

            console.log('Worker message', programIsCorrect);

            const solution = {
              assignmentId: this.assignment.id,
              isCorrect: programIsCorrect,
              program: programToTest,
            };
            await this.createSolution({ solution });

            resolve(programIsCorrect);
          };
        } else {
          // TODO: Graceful degragation, если нет воркеров.
        }
      });
    },

    onGetKey({ key }) {
      this.postMessage({
        action: ACTION_TYPES.LOAD,
        key,
      });
    },

    onIframeLoad() {
      console.log(
        'EDITOR_IFRAME_LOAD',
        'solutionSent',
        this.solutionSent,
        'assignmentFormUnsaved',
        this.assignmentFormUnsaved,
      );
      this.setIframeLoading(false);
      // bus.$emit(EVENTS.IFRAME_LOADED);
      // Если пользователь решал задачу или редактировал/создавал задание,
      // мы будем проверять, что работа с редактором завершена.
      if (this.solutionSent || this.assignmentFormUnsaved) {
        console.log('checkEditorActive');
        EditorService.checkEditorIsActive();
      }
    },

    async onIframeMessage(evt) {
      const { action, key, value } = evt.data;

      if (action === ACTION_TYPES.LOAD) {
        console.log(key, value);

        EditorService.__set(key, value);

        if (key === LOCAL_STORAGE_KEYS.PROGRAM) {
          // Нужно из-за того, что тестирование можно запускать
          // только после того, как из iframe будет извлечена программа.
          // bus.$emit(EVENTS.PROGRAM_LOADED);
          await this.onProgramLoaded();
        } else if (key === LOCAL_STORAGE_KEYS.EDITOR_ACTIVE_KEY) {
          if (
            !value ||
            value === 'false' ||
            value === 'null' ||
            value === 'undefined'
          ) {
            this.setTesting(true);
            // bus.$emit(EVENTS.WAIT_PROGRAM_TO_TEST);
            EditorService.fetchProgram();
          } else {
            this.setTesting(false);
            this.setSolutionSent(false);
            // await this.fetchSolutions();
          }
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

    async onProgramLoaded() {
      console.log('onProgramLoaded');

      const ok = await this.doTests();

      console.log('Result', ok);

      if (ok) {
        bus.$emit(EVENTS.SHOW_TOAST, { message: 'Решение засчитано!' });
      } else {
        bus.$emit(EVENTS.SHOW_TOAST, {
          message: 'Решение неверно',
          isCorrect: false,
        });
      }

      this.setTesting(false);
      this.setSolutionSent(false);

      this.clearSolutions();

      await this.fetchSolutions();
    },

    async fetchSolutions() {
      const courseId = this.$route.params.courseId;
      const assignmentId = this.$route.params.id;

      await this.getAssignment({ courseId, assignmentId });
      await this.getSolutions({ courseId, assignmentId, page: 1 });
    },

    postMessage(message) {
      this.$refs.iframe.contentWindow.postMessage(message, '*');
    },
  },
};
</script>

<style lang="scss" scoped>
.EditorIframe {
  opacity: 0;
  width: 0;
  height: 0;
  border: 0;
}
</style>
