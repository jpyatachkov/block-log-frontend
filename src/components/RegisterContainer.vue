<template>
  <blk-card>
    <blk-card-header class="text-center">
      Регистрация
    </blk-card-header>

    <form-errors
    ref="form"
    :errors="errors"
    />

    <register-form
    ref="form"
    :loading="loading"
    @submit="onSubmit"
    />

    <p class="text-center mt-4">
      Уже есть аккаунт?
      <router-link :to="{ name: 'login' }">
        Войдите!
      </router-link>
    </p>
  </blk-card>
</template>

<script>
import { ErrorsMixin, LoadingMixin } from '@/mixins';

import FormErrors from './FormErrors';
import RegisterForm from './RegisterForm';
import { accountMethods } from '@/store/helpers';

export default {
  name: 'RegisterContainer',

  components: {
    FormErrors,
    RegisterForm,
  },

  mixins: [ErrorsMixin, LoadingMixin],

  methods: {
    ...accountMethods,

    async onSubmit(formData) {
      this.setLoading(true);

      this.clearErrors();
      this.$refs.form.clearErrors();

      try {
        await this.register({ user: formData });
        this.$router.push({ name: 'my_courses' });
      } catch (error) {
        this.$refs.form.mapBackendErrorsToFields(error);
      } finally {
        this.setLoading(false);
      }
    },
  },
};
</script>
