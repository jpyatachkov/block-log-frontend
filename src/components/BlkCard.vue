<template>
  <div
  class="Card p-3"
  :classes="additionalStyles"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BlkCard',

  props: {
    hoverable: {
      default: false,
      type: Boolean,
    },
  },

  computed: {
    additionalStyles() {
      return {
        'Card--hoverable': this.hoverable,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.Card {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.Card::after {
  content: '';
  border-radius: 5px;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  opacity: 0;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.Card--hoverable:hover {
  -webkit-transform: scale(1.1, 1.1);
  transform: scale(1.1, 1.1);
}

.Card--hoverable:hover::after {
  opacity: 1;
}
</style>
