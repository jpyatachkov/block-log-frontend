<template>
  <login-container />
</template>

<script>
import { JwtService } from '@/services';
import LoginContainer from '@/components/LoginContainer';
import { SimpleLayoutMixin } from '@/mixins';

export default {
  name: 'Login',

  components: {
    LoginContainer,
  },

  mixins: [SimpleLayoutMixin],

  created() {
    JwtService.clearToken();
  },
};
</script>
