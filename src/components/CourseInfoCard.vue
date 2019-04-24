<template>
  <app-card :hoverable="false">
    <div class="container-fluid">
      <div class="row d-flex align-items-center">
        <div class="CourseInfoCard__img-container col-3">
          <img
          class="max-height-100 max-width-100"
          :src="require('@/assets/info.png')"
          >
        </div>

        <div class="col-9">
          <app-card-text>
            Курс доступен бесплатно. Все материалы доступны сейчас для
            свободного скачивания.
          </app-card-text>
        </div>
      </div>
    </div>
  </app-card>
</template>

<script>
export default {
  name: 'CourseInfoCard',
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
