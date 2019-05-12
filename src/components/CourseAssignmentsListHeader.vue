<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h2 class="overflow-hidden text-overflow-ellipsis">
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
        v-if="showAddButton"
        class="mr-2"
        @click="$emit('add-assignment')"
        >
          Добавить задачу
        </add-button>

        <blk-button @click="$router.go(-1)">
          Завершить
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

  props: {
    showAddButton: {
      default: true,
      type: Boolean,
    },
  },

  computed: {
    ...coursesComputed,
  },
};
</script>
