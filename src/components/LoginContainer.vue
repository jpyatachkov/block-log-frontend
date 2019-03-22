<template>
  <blk-card>
    <blk-card-header class="text-center">
      Вход
    </blk-card-header>

    <form-errors :errors="errors" />

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
  </blk-card>
</template>

<script>
import { ErrorsMixin, LoadingMixin } from '@/mixins';

import FormErrors from './FormErrors';
import LoginForm from './LoginForm';
import { accountMethods } from '@/store/helpers';

export default {
  name: 'LoginContainer',

  components: {
    FormErrors,
    LoginForm,
  },

  mixins: [ErrorsMixin, LoadingMixin],

  methods: {
    ...accountMethods,

    async onSubmit(formData) {
      this.clearErrors();
      this.setLoading(true);

      try {
        await this.login({ auth: formData });
        this.$router.push({ name: 'courses' });
      } catch (error) {
        this.pushError('Неверный логин или пароль');
      } finally {
        this.setLoading(false);
      }
    },
  },
};
</script>
