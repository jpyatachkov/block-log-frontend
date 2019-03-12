<template>
  <vs-card>
    <div slot="header">
      <h3>Вход в систему</h3>
    </div>

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
      <a href="#">Зарегистрируйтесь!</a>
    </p>
  </vs-card>
</template>

<script>
import LoginForm from './LoginForm';
import ZAlert from './ZAlert';

export default {
  name: 'LoginContainer',

  components: {
    LoginForm,
    ZAlert,
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
