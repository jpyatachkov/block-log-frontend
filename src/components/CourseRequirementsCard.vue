<template>
  <app-card :hoverable="false">
    <p class="mb-1 text-bold">
      Требования:
    </p>

    <app-card-text>
      {{ course.requirements }}
    </app-card-text>
  </app-card>
</template>

<script>
import { coursesComputed } from '@/store/helpers';

export default {
  name: 'CourseRequirementsCard',

  computed: {
    ...coursesComputed,
  },
};
</script>

<style></style>
