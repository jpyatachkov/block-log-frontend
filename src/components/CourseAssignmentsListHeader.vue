<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h2 class="text-overflow-ellipsis">
          {{ course.title }}
        </h2>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col">
        <h5>Редактирование программы курса</h5>
      </div>

      <div class="col d-flex justify-content-end">
        <blk-button
        class="mr-2"
        variant="outline-success"
        @click="$emit('add-assignment')"
        >
          Добавить задачу
        </blk-button>
        <blk-button @click="$router.go(-1)">
          Отмена
        </blk-button>
      </div>
    </div>
  </div>
</template>

<script>
import { coursesComputed } from '@/store/helpers';

export default {
  name: 'CourseAssignmentsListHeader',

  computed: {
    ...coursesComputed,
  },
};
</script>
