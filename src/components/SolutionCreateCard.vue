<template>
  <blk-card>
    <blk-card-actions>
      <blk-button
      round
      variant="primary"
      @click="onClick"
      >
        Решить задачу
      </blk-button>
    </blk-card-actions>
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

      EditorService.clearEditorContent();
      // .setButtonText('Загрузить решение')
      // .setProgram(this.assignment.program)
      // .setRedirectURL(this.$route.fullPath)
      // .openEditor();
    },
  },
};
</script>
