<template>
  <form
  novalidate
  @submit.prevent="$emit('submit')"
  >
    <div
    id="ZForm__content"
    class="vs-con-loading__container"
    >
      <slot />
    </div>

    <slot name="actions">
      <vs-row
      class="mt-2 mb-2"
      vs-align="center"
      vs-type="flex"
      vs-justify="flex-end"
      vs-w="12"
      >
        <z-button
        v-if="clearable"
        color="danger"
        :disabled="disabled || loading"
        flat
        @click.prevent="$emit('clear')"
        >
          {{ clearText }}
        </z-button>

        <z-button
        id="ZForm__submit"
        class="vs-con-loading__container"
        color="primary"
        :disabled="disabled || loading"
        >
          {{ submitText }}
        </z-button>
      </vs-row>
    </slot>
  </form>
</template>

<script>
import ZButton from './ZButton';

export default {
  name: 'ZForm',

  components: {
    ZButton,
  },

  props: {
    clearable: {
      default: false,
      type: Boolean,
    },
    clearText: {
      default: 'Очистить',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    submitText: {
      default: 'Сохранить',
      type: String,
    },
  },

  data: () => ({
    /* eslint-disable */
    loadingElementIds: ['#ZForm__content', '#ZForm__submit'],
    /* eslint-enable */
    loadingScale: 0.6,
  }),

  watch: {
    loading() {
      if (this.loading) {
        this.loadingElementIds.forEach((container) => {
          this.$vs.loading({
            container,
            scale: this.loadingScale,
          });
        });
      } else {
        this.loadingElementIds.forEach((container) => {
          this.$vs.loading.close(`${container} > .con-vs-loading`);
        });
      }
    },
  },
};
</script>
