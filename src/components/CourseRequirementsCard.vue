<template>
  <app-card :hoverable="false">
    <h5>Требования</h5>

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
