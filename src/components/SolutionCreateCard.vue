<template>
  <blk-card>
    <blk-card-actions>
      <blk-button
      block
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
import { EditorService } from '@/services';
import { assignmentsComputed } from '@/store/helpers';

export default {
  name: 'SolutionCreateCard',

  computed: {
    ...assignmentsComputed,
  },

  methods: {
    onClick() {
      EditorService.clearAutosavedProgram()
        .clearProgram()
        .setButtonText('Загрузить решение')
        .setProgram(this.assignment.program)
        .setRedirectURL(this.$route.fullPath)
        .openEditor();
    },
  },
};
</script>
