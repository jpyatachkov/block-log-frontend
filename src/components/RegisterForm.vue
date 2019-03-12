<template>
  <z-form
  submit-text="Зарегистрироваться"
  @submit="onSubmit"
  >
    <z-form-group
    v-model.lazy="firstName"
    :danger="!!firstNameError"
    :danger-text="firstNameError"
    label="Имя"
    />

    <z-form-group
    v-model.lazy="lastName"
    :danger="!!lastNameError"
    :danger-text="lastNameError"
    label="Фамилия"
    />

    <z-form-group
    v-model.lazy="email"
    :danger="!!emailError"
    :danger-text="emailError"
    label="Имя"
    />

    <z-form-group
    v-model.lazy="username"
    :danger="!!usernameError"
    :danger-text="usernameError"
    label="Логин"
    />

    <z-form-group
    v-model.lazy="password"
    :danger="!!passwordError"
    :danger-text="passwordError"
    label="Пароль"
    type="password"
    />

    <z-form-group
    v-model.lazy="passwordConfirmation"
    :danger="!!passwordConfirmationError"
    :danger-text="passwordConfirmationError"
    label="Подтверждение пароля"
    type="password"
    />
  </z-form>
</template>

<script>
import ERRORS from '@/errors';
import SimpleVueValidation from 'simple-vue-validator';
import ZForm from './ZForm';
import ZFormGroup from './ZFormGroup';

const Validator = SimpleVueValidation.Validator;

export default {
  name: 'RegisterForm',

  components: {
    ZForm,
    ZFormGroup,
  },

  data: () => ({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  }),

  validators: {
    firstName: (v) => Validator.value(v).required(ERRORS.required),
    lastName: (v) => Validator.value(v).required(ERRORS.required),
    email: (v) =>
      Validator.value(v)
        .required(ERRORS.required)
        .email(ERRORS.email),
    username: (v) => Validator.value(v).required(ERRORS.required),
    password: (v) => Validator.value(v).required(ERRORS.required),
    'passwordConfirmation,password'(passwordConfirmation, password) {
      if (this.submitted || this.validation.isTouched('password')) {
        return Validator.value(passwordConfirmation)
          .required(ERRORS.required)
          .match(password, ERRORS.passwordsDoNotMatch);
      }
    },
  },

  computed: {
    firstNameError() {
      return this.validation.firstError('firstName');
    },

    lastNameError() {
      return this.validation.firstError('lastName');
    },

    emailError() {
      return this.validation.firstError('email');
    },

    usernameError() {
      return this.validation.firstError('username');
    },

    passwordError() {
      return this.validation.firstError('password');
    },

    passwordConfirmationError() {
      return this.validation.firstError('passwordConfirmation');
    },
  },

  methods: {
    async onSubmit() {
      const isValid = await this.$validate();

      if (!isValid) {
        return;
      }

      this.$emit('submit', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        username: this.username,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
      });
    },
  },
};
</script>
