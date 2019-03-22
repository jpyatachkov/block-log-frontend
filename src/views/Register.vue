<template>
  <register-container />
</template>

<script>
import RegisterContainer from '@/components/RegisterContainer';
import { SimpleLayoutMixin } from '@/mixins';

export default {
  name: 'Register',

  components: {
    RegisterContainer,
  },

  mixins: [SimpleLayoutMixin],
};
</script>
