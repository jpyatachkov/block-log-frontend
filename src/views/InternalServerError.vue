<template>
  <div class="InternalServerError__container">
    <h1>500</h1>

    <h3 class="text-center">
      Что-то пошло не так, но мы уже знаем об этом и работаем над ошибками.
    </h3>

    <h5>
      Нажмите
      <router-link :to="{ name: 'home' }">
        здесь
      </router-link>, чтобы вернуться на главную.
    </h5>
  </div>
</template>

<script>
import { EmptyLayoutMixin } from '@/mixins';

export default {
  name: 'InternalServerError',

  mixins: [EmptyLayoutMixin],
};
</script>

<style lang="scss" scoped>
.InternalServerError {
  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
