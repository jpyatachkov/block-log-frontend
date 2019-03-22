<template>
  <blk-form
  class="LoginForm__container"
  @submit="onSubmit"
  >
    <blk-input
    v-model.lazy="form.username"
    :disabled="loading"
    :errors="usernameErrors"
    label="Логин"
    />

    <blk-input
    v-model.lazy="form.password"
    :disabled="loading"
    :errors="passwordErrors"
    label="Пароль"
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
        Войти
      </blk-button>
    </blk-form-buttons>
  </blk-form>
</template>

<script>
import { FormValidationMixin } from '@/mixins';
import { REQUIRED } from '@/utils/validators/inputs';
import Validator from '@/utils/form-validator';

export default {
  name: 'LoginForm',

  mixins: [FormValidationMixin],

  props: {
    loading: {
      default: false,
      type: Boolean,
    },
  },

  data: () => ({
    form: {
      username: '',
      password: '',
    },
  }),

  computed: {
    usernameErrors() {
      return this.getFieldErrors('form.username');
    },

    passwordErrors() {
      return this.getFieldErrors('form.password');
    },
  },

  validators: {
    'form.username': (v) => Validator.value(v).required(REQUIRED),
    'form.password': (v) => Validator.value(v).required(REQUIRED),
  },
};
</script>

<style lang="scss" scoped>
.LoginForm__container {
  min-width: 290px;
}
</style>
