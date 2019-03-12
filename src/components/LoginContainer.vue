<template>
  <z-card>
    <z-card-header
    slot="header"
    title="Вход"
    />

    <z-alert
    v-if="error"
    v-model="error"
    color="danger"
    dismissible
    >
      {{ errorContent }}
    </z-alert>

    <login-form @submit="onSubmit" />

    <p class="text-center">
      Нет аккаунта?
      <router-link :to="{ name: 'register' }">
        Зарегистрируйтесь!
      </router-link>
    </p>
  </z-card>
</template>

<script>
import LoginForm from './LoginForm';
import ZAlert from './ZAlert';
import ZCard from './ZCard';
import ZCardHeader from './ZCardHeader';

export default {
  name: 'LoginContainer',

  components: {
    LoginForm,
    ZAlert,
    ZCard,
    ZCardHeader,
  },

  data: () => ({
    error: false,
    errorContent: null,
  }),

  methods: {
    onSubmit(formData) {
      console.log(formData);
    },

    setError(content) {
      this.error = !!content;
      this.errorContent = content;
    },
  },
};
</script>
