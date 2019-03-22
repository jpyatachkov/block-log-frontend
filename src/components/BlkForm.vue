<template>
  <form
  novalidate
  @submit.prevent="$emit('submit')"
  >
    <slot />
  </form>
</template>

<script>
export default {
  name: 'BlkForm',
};
</script>
