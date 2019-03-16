<template>
  <div>
    <v-form
    ref="form"
    v-model="valid"
    >
      <z-input
      v-model.lazy="form.username"
      :rules="rules.username"
      label="Логин"
      prepend-icon="account_circle"
      />

      <z-input
      v-model.lazy="form.password"
      :rules="rules.password"
      prepend-icon="lock"
      label="Пароль"
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
      ВОЙТИ
    </v-btn>
  </div>
</template>

<script>
import ZInput from './ZInput';
import { required } from '@/utils/validators/inputs';

export default {
  name: 'LoginForm',

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
    form: {
      username: '',
      password: '',
    },
    rules: {
      username: [required],
      password: [required],
    },
    valid: false,
  }),

  methods: {
    onSubmit() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.$emit('submit', this.form);
    },
  },
};
</script>
