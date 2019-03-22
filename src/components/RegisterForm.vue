<template>
  <blk-form
  class="RegisterForm__container"
  @submit="onSubmit"
  >
    <blk-input
    v-model.lazy="form.firstName"
    :errors="firstNameErrors"
    label="Имя"
    />

    <blk-input
    v-model.lazy="form.lastName"
    :errors="lastNameErrors"
    label="Фамилия"
    />

    <blk-input
    v-model.lazy="form.email"
    :errors="emailErrors"
    label="Электронная почта"
    />

    <blk-input
    v-model.lazy="form.username"
    :errors="usernameErrors"
    label="Логин"
    />

    <blk-input
    v-model.lazy="form.password"
    :errors="passwordErrors"
    label="Пароль"
    type="password"
    />

    <blk-input
    v-model.lazy="form.passwordConfirmation"
    :errors="passwordConfirmationErrors"
    label="Подтверждение пароля"
    type="password"
    />

    <blk-form-buttons>
      <blk-button
      :disabled="loading"
      :loading="loading"
      block
      round
      type="submit"
      variant="primary"
      >
        Зарегистрироваться
      </blk-button>
    </blk-form-buttons>
  </blk-form>
</template>

<script>
import { EMAIL, REQUIRED } from '@/utils/validators/inputs';
import { ErrorsMixin, FormValidationMixin } from '@/mixins';

import Validator from '@/utils/form-validator';

export default {
  name: 'RegisterForm',

  mixins: [ErrorsMixin, FormValidationMixin],

  props: {
    loading: {
      default: false,
      type: Boolean,
    },
  },

  data: () => ({
    form: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
    },
  }),

  computed: {
    firstNameErrors() {
      return this.getFieldErrors('form.firstName');
    },

    lastNameErrors() {
      return this.getFieldErrors('form.lastName');
    },

    emailErrors() {
      return this.getFieldErrors('form.email');
    },

    usernameErrors() {
      return this.getFieldErrors('form.username');
    },

    passwordErrors() {
      return this.getFieldErrors('form.password');
    },

    passwordConfirmationErrors() {
      return this.getFieldErrors('form.passwordConfirmation');
    },
  },

  validators: {
    'form.firstName': (v) => Validator.value(v).required(REQUIRED),
    'form.lastName': (v) => Validator.value(v).required(REQUIRED),
    'form.email': (v) =>
      Validator.value(v)
        .required(REQUIRED)
        .email(EMAIL),
    'form.username': (v) => Validator.value(v).required(REQUIRED),
    'form.password': (v) => Validator.value(v).required(REQUIRED),
    'form.passwordConfirmation, form.password': function(
      confirmation,
      password,
    ) {
      if (
        this.submitted ||
        this.validation.isTouched('form.passwordConfirmation')
      ) {
        return Validator.value(confirmation)
          .required(REQUIRED)
          .match(password, 'Пароль и подтверждение не совпадают');
      }
    },
  },
};
</script>

<style>
.RegisterForm__container {
  min-width: 290px;
}
</style>
