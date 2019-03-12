<template>
  <h3>{{ title }}</h3>
</template>

<script>
export default {
  name: 'ZCardHeader',

  props: {
    title: {
      required: true,
      type: String,
    },
  },
};
</script>
