<template>
  <div class="container-fluid">
    <div class="row mt-3 mb-3">
      <div class="col d-flex justify-content-end">
        <edit-button
        v-if="!loading && (userIsCollaborator || userIsModerator)"
        @click="
          $router.push({
            name: 'course_update',
            params: { id: $route.params.id },
          })
        "
        >
          Редактировать информацию
        </edit-button>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-7 col-lg-8 mb-2">
        <content-placeholders
        v-if="loading"
        class="m-3"
        >
          <content-placeholders-text :lines="3" />
        </content-placeholders>
        <course-content-card v-else />
      </div>

      <div class="col-xs-12 col-md-5 col-lg-4">
        <div class="row mb-2">
          <div class="col">
            <content-placeholders
            v-if="loading"
            class="m-3"
            >
              <content-placeholders-text :lines="3" />
            </content-placeholders>
            <course-complexity-card v-else />
          </div>
        </div>

        <div class="row mb-2">
          <div class="col">
            <content-placeholders
            v-if="loading"
            class="m-3"
            >
              <content-placeholders-text :lines="3" />
            </content-placeholders>
            <course-requirements-card v-else />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <content-placeholders
            v-if="loading"
            class="m-3"
            >
              <content-placeholders-text :lines="3" />
            </content-placeholders>
            <course-info-card v-else />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseComplexityCard from './CourseComplexityCard';
import CourseContentCard from './CourseContentCard';
import CourseInfoCard from './CourseInfoCard';
import CourseRequirementsCard from './CourseRequirementsCard';
import EditButton from './EditButton';
import { coursePermissions } from '@/store/helpers';

export default {
  name: 'CourseInfo',

  components: {
    CourseComplexityCard,
    CourseContentCard,
    CourseInfoCard,
    CourseRequirementsCard,
    EditButton,
  },

  props: {
    loading: {
      required: true,
      type: Boolean,
    },
  },

  computed: {
    ...coursePermissions,
  },
};
</script>

<style lang="scss" scoped>
.CourseInfoCard {
  &__img-container {
    width: 30px;
    height: 30px;
  }
}
</style>
