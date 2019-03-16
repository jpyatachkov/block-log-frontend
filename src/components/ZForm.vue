<template>
  <v-form
  :value="value"
  @input="$emit($event)"
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
        :disabled="disabled || loading"
        color="danger"
        flat
        type="reset"
        @click.prevent="$emit('clear')"
        >
          {{ clearText }}
        </z-button>

        <z-button
        :disabled="disabled || loading"
        :loading="loading"
        color="primary"
        type="submit"
        >
          {{ submitText }}
        </z-button>
      </vs-row>
    </slot>
  </v-form>
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
    value: {
      required: true,
      type: Boolean,
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
