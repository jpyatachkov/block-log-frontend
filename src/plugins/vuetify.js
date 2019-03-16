import 'vuetify/dist/vuetify.min.css';

import Vuetify, {
  VAlert,
  VApp,
  VBtn,
  VCard,
  VCardActions,
  VCardTitle,
  VContainer,
  VContent,
  VFlex,
  VForm,
  VHover,
  VLayout,
  VTab,
  VTabItem,
  VTabs,
  VTabsItems,
  VTextField,
} from 'vuetify/lib';

import { Ripple } from 'vuetify/lib/directives';
import Vue from 'vue';

Vue.use(Vuetify, {
  components: {
    VApp,
    VAlert,
    VBtn,
    VCard,
    VCardActions,
    VCardTitle,
    VContainer,
    VContent,
    VFlex,
    VForm,
    VHover,
    VLayout,
    VTab,
    VTabItem,
    VTabs,
    VTabsItems,
    VTextField,
  },
  directives: {
    Ripple,
  },
  theme: {
    primary: '#8A59D5',
  },
});
