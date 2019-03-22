<template>
  <div>
    <blk-alert
    v-for="error in errors"
    :key="error.content"
    class="mt-1 mb-1"
    dismissible
    show
    variant="danger"
    >
      {{ error.content }}
    </blk-alert>
  </div>
</template>

<script>
export default {
  name: 'FormErrors',

  props: {
    errors: {
      required: true,
      type: Array,
    },
  },
};
</script>
