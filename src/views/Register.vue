<template>
  <register-container />
</template>

<script>
import RegisterContainer from '@/components/RegisterContainer';
import layoutNames from '@/layouts';
import { rootMethods } from '@/store/helpers';

export default {
  name: 'Register',

  components: {
    RegisterContainer,
  },

  mounted() {
    this.setLayout(layoutNames.SIMPLE_LAYOUT);
  },

  methods: {
    ...rootMethods,
  },
};
</script>
