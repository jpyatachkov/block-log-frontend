<template>
  <app-card :hoverable="false">
    <h5>О чем курс?</h5>

    {{ course.shortDescription }}

    <h5 class="mt-2">
      Описание курса
    </h5>

    {{ course.description }}
  </app-card>
</template>

<script>
import { coursesComputed } from '@/store/helpers';

export default {
  name: 'CourseContentCard',

  computed: {
    ...coursesComputed,
  },
};
</script>
