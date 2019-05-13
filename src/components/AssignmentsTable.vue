<template>
  <app-lazy-container
  :can-load-more="canLoadMoreAssignments"
  :loading="loading"
  @fetch="$emit('fetch-assignments', $event)"
  >
    <b-table
    :fields="fields"
    :items="coloredAssignments"
    >
      <template v-slot:index="{ index }">
        {{ index + 1 }}
      </template>

      <template v-slot:title="{ value }">
        <div class="break-all">
          {{ value }}
        </div>
      </template>

      <template v-slot:countAttempts="{ value }">
        {{ value }}
      </template>

      <template v-slot:passed="{ value }">
        <app-status
        v-if="value !== -1"
        :success="!!value"
        />
      </template>
    </b-table>
  </app-lazy-container>
</template>

<script>
import { assignmentsComputed, coursesComputed } from '@/store/helpers';

import AppStatus from './AppStatus';

export default {
  name: 'AssignmentsTable',

  components: {
    AppStatus,
  },

  props: {
    loading: {
      default: false,
      type: Boolean,
    },
  },

  computed: {
    ...assignmentsComputed,
    ...coursesComputed,

    coloredAssignments() {
      return Array.from((this.assignments || []).entries()).map(
        ([num, assignment]) => {
          if (num < this.course.countPassed) {
            if (!assignment.passed) {
              assignment['_rowVariant'] = 'danger';
            } else {
              assignment['_rowVariant'] = 'success';
            }
          }

          if (num === this.course.countPassed) {
            assignment['_rowVariant'] = 'warning';
          }

          if (!this.userIsEnrolled) {
            assignment['_rowVariant'] = 'secondary';
            assignment['passed'] = -1;
          }

          if (num > this.course.countPassed) {
            assignment['passed'] = -1;
          }

          return assignment;
        },
      );
    },

    fields() {
      const fields = {
        index: {
          label: '#',
          sortable: false,
        },
        title: {
          label: 'Задание',
          sortable: false,
        },
        passed: {
          label: '',
          class: 'text-center',
          sortable: false,
        },
      };

      if (this.userIsCollaborator || this.userIsModerator) {
        fields['countAttempts'] = {
          label: 'Попытки',
          class: 'text-center',
          sortable: false,
        };
      }

      return fields;
    },
  },
};
</script>
