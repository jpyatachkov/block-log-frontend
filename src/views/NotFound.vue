<template>
  <div class="NotFound__container">
    <h1>404</h1>

    <h3>
      Запрашиваемая страница не найдена :(
    </h3>

    <h5>
      Нажмите
      <router-link :to="redirectDestination">
        здесь
      </router-link>, чтобы вернуться на главную.
    </h5>
  </div>
</template>

<script>
import { EmptyLayoutMixin } from '@/mixins';
import { JwtService } from '@/services';

export default {
  name: 'NotFound',

  mixins: [EmptyLayoutMixin],

  computed: {
    redirectDestination() {
      const userLoggedIn = JwtService.hasToken();

      let destination = { name: 'home' };

      if (userLoggedIn) {
        destination = { name: 'my_courses' };
      }

      return destination;
    },
  },
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
