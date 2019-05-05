<template>
  <div>
    <b-form-select
    v-bind="$attrs"
    v-on="$listeners"
    />
  </div>
</template>

<script>
export default {
  name: 'AppFormSelect',

  inheritAttrs: false,
};
</script>
