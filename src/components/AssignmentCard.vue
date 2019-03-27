<template>
  <blk-card
  :hoverable="preview"
  @click.native="onClick"
  >
    <assignment-card-number
    v-if="preview"
    slot="image"
    :number="index"
    />

    {{ text }}

    <assignment-edit-card v-if="showEdit" />
  </blk-card>
</template>

<script>
import AssignmentCardNumber from './AssignmentCardNumber';
import AssignmentEditCard from './AssignmentEditCard';
import { ShortenMixin } from '@/mixins';
import { coursePermissions } from '@/store/helpers';

export default {
  name: 'AssignmentCard',

  components: {
    AssignmentCardNumber,
    AssignmentEditCard,
  },

  mixins: [ShortenMixin],

  props: {
    assignment: {
      required: true,
      type: Object,
    },
    index: {
      default: 0,
      type: Number,
    },
    preview: {
      default: true,
      type: Boolean,
    },
  },

  computed: {
    ...coursePermissions,

    showEdit() {
      if (this.preview) {
        return false;
      }

      return (
        this.userIsEnrolled && (this.userIsCollaborator || this.userIsModerator)
      );
    },

    text() {
      let text = this.assignment.text;

      if (this.preview) {
        text = this.shorten(text, 100);
      }

      return text;
    },
  },

  methods: {
    onClick() {
      if (this.preview) {
        const courseId = this.assignment.course.id;
        const id = this.assignment.id;

        this.$router.push({ name: 'assignment', params: { courseId, id } });
      }
    },
  },
};
</script>
