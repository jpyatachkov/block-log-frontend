<template>
  <blk-card :hoverable="preview">
    <assignment-card-number
    v-if="preview"
    slot="image"
    :number="index"
    />
    {{ text }}
  </blk-card>
</template>

<script>
import AssignmentCardNumber from './AssignmentCardNumber';
import { ShortenMixin } from '@/mixins';

export default {
  name: 'AssignmentCard',

  components: {
    AssignmentCardNumber,
  },

  mixins: [ShortenMixin],

  props: {
    assignment: {
      required: true,
      type: Object,
    },
    index: {
      required: true,
      type: Number,
    },
    preview: {
      default: true,
      type: Boolean,
    },
  },

  computed: {
    text() {
      let text = this.assignment.text;

      if (this.preview) {
        text = this.shorten(text, 100);
      }

      return text;
    },
  },
};
</script>
