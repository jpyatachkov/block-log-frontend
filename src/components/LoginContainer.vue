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

    <login-form
    :loading="loading"
    @submit="onSubmit"
    />

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
import { mapActions } from 'vuex';

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
    loading: false,
  }),

  methods: {
    ...mapActions({
      login: 'account/login',
    }),

    async onSubmit(formData) {
      this.setError(null);
      this.loading = true;

      try {
        await this.login({ auth: formData });
        this.$router.push({ name: 'home' });
      } catch (error) {
        console.log(error);
        this.setError('Неверный логин или пароль');
      } finally {
        this.loading = false;
      }
    },

    setError(content) {
      this.error = !!content;
      this.errorContent = content;
    },
  },
};
</script>
