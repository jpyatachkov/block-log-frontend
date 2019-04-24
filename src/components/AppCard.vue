<template>
  <div
  class="card Card Card--word--wrap"
  :class="additionalClasses"
  >
    <div class="d-flex justify-content-center align-items-end">
      <div class="Card__img-container">
        <img
        class="card-img-top Card__img"
        :src="imgSrc"
        :alt="imgAlt"
        >
      </div>
    </div>

    <div class="card-body d-flex flex-column">
      <h4 class="card-title">
        {{ title }}
      </h4>

      <h6 class="card-subtitle text-muted mb-2">
        {{ subtitle }}
      </h6>

      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppCard',

  inheritAttrs: false,

  props: {
    hoverable: {
      default: true,
      type: Boolean,
    },
    imgAlt: {
      default: '',
      type: String,
    },
    imgSrc: {
      required: true,
      type: String,
    },
    subtitle: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
  },

  computed: {
    additionalClasses() {
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
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);

  &::after {
    content: '';
    border-radius: 5px;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    opacity: 0;
    -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  &--hoverable {
    cursor: pointer;

    &:hover {
      transform: scale(1.01, 1.01);
    }

    &:hover::after {
      opacity: 1;
    }
  }

  &--word-wrap {
    word-wrap: break-word;
  }

  &__img-container {
    width: 120px;
    height: 120px;
    margin-top: 27px;
  }

  &__img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
