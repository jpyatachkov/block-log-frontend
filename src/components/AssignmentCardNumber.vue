<template>
  <div
  class="AssignmentCardNumber__container AssignmentCardNumber__container--round"
  >
    <h3>{{ number + 1 }}</h3>
  </div>
</template>

<script>
export default {
  name: 'AssignmentCardNumber',

  props: {
    number: {
      required: true,
      type: Number,
    },
  },
};
</script>

<style lang="scss" scoped>
.AssignmentCardNumber__container {
  height: 100px;
  background-color: #75bdf1;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.AssignmentCardNumber__container--round {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
</style>
