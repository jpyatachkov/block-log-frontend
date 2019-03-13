<template>
  <z-card>
    <z-card-header
    slot="header"
    title="Вход"
    />

    <z-alert
    v-if="error"
    v-model="error"
    class="mt-1 mb-1"
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
import { accountMethods } from '@/store/helpers';

export default {
  name: 'LoginContainer',

  components: {
    LoginForm,
    ZAlert,
    ZCard,
    ZCardHeader,
  },

  data: () => ({
    error: null,
    errorContent: null,
    loading: false,
  }),

  methods: {
    ...accountMethods,

    async onSubmit(formData) {
      this.setError(null);
      this.loading = true;

      try {
        await this.login({ auth: formData });
        this.$router.push({ name: 'home' });
      } catch (error) {
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
