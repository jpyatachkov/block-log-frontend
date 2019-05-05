<template>
  <b-form-file
  v-bind="$attrs"
  v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'AppFormFile',

  inheritAttrs: false,
};
</script>
