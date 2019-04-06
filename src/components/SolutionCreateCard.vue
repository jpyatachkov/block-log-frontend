<template>
  <blk-card>
    <div class="SolutionCreateCard__container">
      <blk-button
      round
      variant="primary"
      @click="onClick"
      >
        Решить задачу
      </blk-button>
    </div>
  </blk-card>
</template>

<script>
import { assignmentsComputed, solutionsMethods } from '@/store/helpers';

import { EditorService } from '@/services';

export default {
  name: 'SolutionCreateCard',

  computed: {
    ...assignmentsComputed,
  },

  methods: {
    ...solutionsMethods,

    onClick() {
      this.setSolutionSent(true);

      EditorService.clearEditorContent()
        .setButtonText('Загрузить решение')
        .setProgram(this.assignment.program)
        .setRedirectURL(this.$route.fullPath)
        .openEditor();
    },
  },
};
</script>

<style lang="scss" scoped>
.SolutionCreateCard__container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
