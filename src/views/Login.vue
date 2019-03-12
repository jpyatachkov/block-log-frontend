<template>
  <login-container />
</template>

<script>
import LoginContainer from '@/components/LoginContainer';
import layoutNames from '@/layouts';
import { mapMutations } from 'vuex';

export default {
  name: 'Login',

  components: {
    LoginContainer,
  },

  mounted() {
    this.setLayout(layoutNames.SIMPLE_LAYOUT);
  },

  methods: {
    ...mapMutations(['setLayout']),
  },
};
</script>
