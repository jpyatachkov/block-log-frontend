<template>
  <login-container />
</template>

<script>
import LoginContainer from '@/components/LoginContainer';
import { SimpleLayoutMixin } from '@/mixins';

export default {
  name: 'Login',

  components: {
    LoginContainer,
  },

  mixins: [SimpleLayoutMixin],
};
</script>
