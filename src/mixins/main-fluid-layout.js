import RootMixin from './root';
import layoutNames from '@/layouts';

export default {
  ...RootMixin,

  mounted() {
    this.setLayout(layoutNames.MAIN_FLUID_LAYOUT);
  },
};
