<template>
  <register-container />
</template>

<script>
import { JwtService } from '@/services';
import RegisterContainer from '@/components/RegisterContainer';
import { SimpleLayoutMixin } from '@/mixins';

export default {
  name: 'Register',

  components: {
    RegisterContainer,
  },

  mixins: [SimpleLayoutMixin],

  created() {
    JwtService.clearToken();
  },
};
</script>
