<template>
  <div class="NotFound__container height-100">
    <h1>404</h1>
    <h3>
      Запрашиваемая страница не найдена. Нажмите
      <router-link :to="{ name: 'home' }">
        здесь
      </router-link>, чтобы вернуться
      на главную
    </h3>
  </div>
</template>

<script>
import { EmptyLayoutMixin } from '@/mixins';

export default {
  name: 'NotFound',

  mixins: [EmptyLayoutMixin],
};
</script>

<style lang="scss" scoped>
.NotFound__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
