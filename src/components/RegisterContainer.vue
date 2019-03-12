<template>
  <z-card>
    <z-card-header
    slot="header"
    title="Регистрация"
    />

    <register-form @submit="onSubmit" />

    <p class="text-center">
      Уже есть аккаунт?
      <router-link :to="{ name: 'login' }">
        Войдите!
      </router-link>
    </p>
  </z-card>
</template>

<script>
import RegisterForm from './RegisterForm';
import ZCard from './ZCard';
import ZCardHeader from './ZCardHeader';

export default {
  name: 'RegisterContainer',

  components: {
    RegisterForm,
    ZCard,
    ZCardHeader,
  },

  methods: {
    onSubmit(formData) {},
  },
};
</script>
