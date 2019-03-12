<template>
  <register-container />
</template>

<script>
import RegisterContainer from '@/components/RegisterContainer';
import layoutNames from '@/layouts';
import { mapMutations } from 'vuex';

export default {
  name: 'Register',

  components: {
    RegisterContainer,
  },

  mounted() {
    this.setLayout(layoutNames.SIMPLE_LAYOUT);
  },

  methods: {
    ...mapMutations(['setLayout']),
  },
};
</script>
