<template>
  <z-form
  :loading="loading"
  submit-text="Войти"
  @submit="onSubmit"
  >
    <z-form-group
    v-model.lazy="username"
    :danger="!!usernameError"
    :danger-text="usernameError"
    icon="account_circle"
    label="Логин"
    />

    <z-form-group
    v-model.lazy="password"
    :danger="!!passwordError"
    :danger-text="passwordError"
    icon="lock"
    label="Пароль"
    type="password"
    />
  </z-form>
</template>

<script>
import ERRORS from '@/errors';
import SimpleVueValidation from 'simple-vue-validator';
import ZForm from './ZForm';
import ZFormGroup from './ZFormGroup';
import { mapGetters } from 'vuex';

const Validator = SimpleVueValidation.Validator;

export default {
  name: 'LoginForm',

  components: {
    ZForm,
    ZFormGroup,
  },

  props: {
    loading: {
      default: false,
      type: Boolean,
    },
  },

  data: () => ({
    username: '',
    password: '',
  }),

  validators: {
    username: (v) => Validator.value(v).required(ERRORS.required),
    password: (v) => Validator.value(v).required(ERRORS.required),
  },

  computed: {
    ...mapGetters(['offline']),

    usernameError() {
      return this.validation.firstError('username');
    },

    passwordError() {
      return this.validation.firstError('password');
    },
  },

  methods: {
    async onSubmit() {
      const isValid = await this.$validate();

      if (!isValid) {
        return;
      }

      this.$emit('submit', {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>
