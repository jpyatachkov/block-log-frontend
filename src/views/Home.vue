<template>
  <p>1</p>
  <!-- <div>
    <vs-row
    class="mb-2"
    vs-align="center"
    vs-type="flex"
    vs-justify="flex-end"
    vs-w="12"
    >
      <z-button
      class="mr-2 Course__button"
      color="primary"
      large
      round
      >
        Новый курс
      </z-button>
    </vs-row>

    <v-tabs
    slider-color="primary"
    fixed-tabs
    >
      <v-tab href="#tab-1">
        Мои курсы
      </v-tab>

      <v-tab href="#tab-2">
        Все курсы
      </v-tab>
    </v-tabs>

    <v-tabs-items>
      <v-tab-item value="#tab-1">
        <courses-grid />
      </v-tab-item>

      <v-tab-item value="#tab-2">
        <courses-grid />
      </v-tab-item>
    </v-tabs-items>
  </div> -->
</template>

<script>
import { MainLayoutMixin } from '@/mixins';

export default {
  name: 'Home',

  mixins: [MainLayoutMixin],
};
</script>
