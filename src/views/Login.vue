<template>
  <login-container />
</template>

<script>
import LoginContainer from '@/components/LoginContainer';
import layoutNames from '@/layouts';
import { rootMethods } from '@/store/helpers';

export default {
  name: 'Login',

  components: {
    LoginContainer,
  },

  mounted() {
    this.setLayout(layoutNames.SIMPLE_LAYOUT);
  },

  methods: {
    ...rootMethods,
  },
};
</script>
