<template>
  <z-card>
    <z-card-header
    slot="header"
    title="Регистрация"
    />

    <z-alert
    v-for="error in errors"
    :key="error.content"
    v-model="error.show"
    class="mt-1 mb-1"
    color="danger"
    dismissible
    >
      {{ error.content }}
    </z-alert>

    <register-form
    :loading="loading"
    @submit="onSubmit"
    />

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
import ZAlert from './ZAlert';
import ZCard from './ZCard';
import ZCardHeader from './ZCardHeader';
import { accountMethods } from '@/store/helpers';

export default {
  name: 'RegisterContainer',

  components: {
    RegisterForm,
    ZAlert,
    ZCard,
    ZCardHeader,
  },

  data: () => ({
    errors: [],
    loading: false,
  }),

  methods: {
    ...accountMethods,

    async onSubmit(formData) {
      this.loading = true;
      this.resetErrors();

      try {
        await this.register({ user: formData });
        this.$router.push({ name: 'home' });
      } catch (error) {
        const errorDetails = error.response.data.errors;
        Object.entries(errorDetails).forEach(([k, v]) =>
          this.resolveErrors(k, v),
        );
      } finally {
        this.loading = false;
      }
    },

    // TODO: Добавить перевод ошибок на бекенде и переписать этот метод.
    /**
     * @param {string} formField
     * @param {[]} errors
     */
    resolveErrors(formField, errors) {
      if (formField === 'username') {
        errors.forEach((error) => {
          switch (true) {
            case error === 'has already been taken':
              this.pushError('Пользователь с таким именем уже существует');
              break;
          }
        });
      } else if (formField === 'email') {
        errors.forEach((error) => {
          switch (true) {
            case error === 'has already been taken':
              this.pushError(
                'Пользователь с таким адресом электронной почты уже существует',
              );
              break;
          }
        });
      }
    },

    pushError(content) {
      this.errors.push({
        show: true,
        content,
      });
    },

    resetErrors() {
      this.errors = [];
    },
  },
};
</script>
