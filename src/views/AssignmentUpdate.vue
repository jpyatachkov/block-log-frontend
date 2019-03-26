<template>
  <assignment-container update />
</template>

<script>
import AssignmentContainer from '@/components/AssignmentContainer';
import { EmptyLayoutMixin } from '@/mixins';

export default {
  name: 'AssignmentUpdate',

  components: {
    AssignmentContainer,
  },

  mixins: [EmptyLayoutMixin],
};
</script>
