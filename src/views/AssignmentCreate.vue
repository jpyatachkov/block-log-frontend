<template>
  <assignment-container />
</template>

<script>
import AssignmentContainer from '@/components/AssignmentContainer';
import { EmptyLayoutMixin } from '@/mixins';

export default {
  name: 'AssignmentCreate',

  components: {
    AssignmentContainer,
  },

  mixins: [EmptyLayoutMixin],
};
</script>
