<template>
  <div
  class="Card Card--word-wrap"
  :class="additionalStyles"
  >
    <div class="Card__image-container">
      <slot name="image" />
    </div>

    <div class="p-3">
      <slot />
    </div>
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
  border-radius: 6px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
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
  transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.Card--hoverable {
  cursor: pointer;
}

.Card--hoverable:hover {
  transform: scale(1.01, 1.01);
}

.Card--hoverable:hover::after {
  opacity: 1;
}

.Card--word-wrap {
  word-wrap: break-word;
}

.Card__image-container {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}
</style>
