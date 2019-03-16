<template>
  <z-card :class="classes">
    <z-card-title>
      <h2>Вход</h2>
    </z-card-title>

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

    <p class="text-center mt-4">
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
import ZCardTitle from './ZCardTitle';
import { accountMethods } from '@/store/helpers';

export default {
  name: 'LoginContainer',

  components: {
    LoginForm,
    ZAlert,
    ZCard,
    ZCardTitle,
  },

  data: () => ({
    error: null,
    errorContent: null,
    loading: false,
  }),

  computed: {
    classes() {
      let classes;

      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          classes = ['pa-1'];
          break;
        case 'md':
        case 'lg':
        case 'xl':
          classes = ['pa-3'];
          break;
      }

      return classes;
    },
  },

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
