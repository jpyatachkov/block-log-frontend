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
import { LoadingMixin } from '@/mixins';
import ZButton from './ZButton';

export default {
  name: 'ZForm',

  components: {
    ZButton,
  },

  mixins: [LoadingMixin],

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
    loadingConfig: {
      elementIds: ['#ZForm__content'],
      type: 'sound',
    },
  }),
};
</script>
