<template>
  <div class="container-fluid">
    <div class="row mt-3 mb-3">
      <div class="col d-flex justify-content-end">
        <edit-button
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
        <course-content-card />
      </div>

      <div class="col-xs-12 col-md-5 col-lg-4">
        <div class="row mb-2">
          <div class="col">
            <course-complexity-card />
          </div>
        </div>

        <div class="row mb-2">
          <div class="col">
            <course-requirements-card />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <course-info-card />
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

export default {
  name: 'CourseInfo',

  components: {
    CourseComplexityCard,
    CourseContentCard,
    CourseInfoCard,
    CourseRequirementsCard,
    EditButton,
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
