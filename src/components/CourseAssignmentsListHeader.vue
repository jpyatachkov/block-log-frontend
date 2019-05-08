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
      <div class="col-xs-12 col-lg-6">
        <h5>Редактирование программы курса</h5>
      </div>

      <div
      class="col-xs-12 col-lg-6 d-flex justify-content-end align-items-center"
      >
        <add-button
        class="mr-2"
        @click="$emit('add-assignment')"
        >
          Добавить задачу
        </add-button>

        <blk-button @click="$router.go(-1)">
          Отмена
        </blk-button>
      </div>
    </div>
  </div>
</template>

<script>
import AddButton from './AddButton';
import { coursesComputed } from '@/store/helpers';

export default {
  name: 'CourseAssignmentsListHeader',

  components: {
    AddButton,
  },

  computed: {
    ...coursesComputed,
  },
};
</script>
