<template>
  <div>
    <v-form
    ref="form"
    v-model="valid"
    >
      <z-input
      v-model.lazy="form.firstName"
      :rules="rules.firstName"
      label="Имя"
      />

      <z-input
      v-model.lazy="form.lastName"
      :rules="rules.lastName"
      label="Фамилия"
      />

      <z-input
      v-model.lazy="form.email"
      :error-messages="errors.email"
      :rules="rules.email"
      label="Электронная почта"
      />

      <z-input
      v-model.lazy="form.username"
      :error-messages="errors.username"
      :rules="rules.username"
      label="Логин"
      />

      <z-input
      v-model.lazy="form.password"
      :rules="rules.password"
      label="Пароль"
      type="password"
      />

      <z-input
      v-model.lazy="form.passwordConfirmation"
      :error-messages="errors.passwordConfirmation"
      :rules="rules.passwordConfirmation"
      label="Подтверждение пароля"
      type="password"
      />
    </v-form>

    <v-btn
    color="primary"
    :disabled="loading"
    :loading="loading"
    block
    large
    @click="onSubmit"
    >
      ЗАРЕГИСТРИРОВАТЬСЯ
    </v-btn>
  </div>
</template>

<script>
import { email, passwordLength, required } from '@/utils/validators/inputs';

import ZInput from './ZInput';

export default {
  name: 'RegisterForm',

  components: {
    ZInput,
  },

  props: {
    loading: {
      default: false,
      type: Boolean,
    },
  },

  data: () => ({
    errors: {
      email: [],
      username: [],
      passwordConfirmation: [],
    },
    form: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    rules: {
      firstName: [required],
      lastName: [required],
      email: [required, email],
      username: [required],
      password: [required, passwordLength(8)],
      passwordConfirmation: [required, passwordLength(8)],
    },
    valid: false,
  }),

  watch: {
    'form.password'() {
      this.comparePasswords();
    },

    'form.passwordConfirmation'() {
      this.comparePasswords();
    },
  },

  methods: {
    comparePasswords() {
      if (this.form.password === this.form.passwordConfirmation) {
        this.errors.passwordConfirmation = [];
      } else {
        this.errors.passwordConfirmation.push(
          'Пароль и подтверждение не совпадают',
        );
      }
    },

    onSubmit() {
      if (!this.$refs.form.validate()) {
        return;
      }

      if (this.form.password !== this.form.passwordConfirmation) {
        return;
      }

      this.$emit('submit', this.form);
    },

    setError(field, error) {
      if (!this.errors[field]) {
        this.errors[field] = [];
      }

      this.errors[field].push(error);
    },
  },
};
</script>
