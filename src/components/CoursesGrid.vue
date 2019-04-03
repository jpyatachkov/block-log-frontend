<template>
  <blk-items-grid
  :items="courses"
  :loading="loading"
  no-items="В системе пока нет ни одного курса"
  @fetch="$emit('fetch', $event)"
  >
    <template slot="no-items">
      <slot name="no-items" />
    </template>

    <template v-slot="{ item }">
      <course-card :course="item" />
    </template>
  </blk-items-grid>
</template>

<script>
import BlkItemsGrid from './BlkItemsGrid';
import CourseCard from './CourseCard';

export default {
  name: 'CourseGrid',

  components: {
    BlkItemsGrid,
    CourseCard,
  },

  props: {
    courses: {
      required: true,
      type: Array,
    },
    loading: {
      required: true,
      type: Boolean,
    },
  },
};
</script>
