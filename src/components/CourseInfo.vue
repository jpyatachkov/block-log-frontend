<template>
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
</template>

<script>
import CourseComplexityCard from './CourseComplexityCard';
import CourseContentCard from './CourseContentCard';
import CourseInfoCard from './CourseInfoCard';
import CourseRequirementsCard from './CourseRequirementsCard';

export default {
  name: 'CourseInfo',

  components: {
    CourseComplexityCard,
    CourseContentCard,
    CourseInfoCard,
    CourseRequirementsCard,
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
