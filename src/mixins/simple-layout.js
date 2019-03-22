import RootMixin from './root';
import layoutNames from '@/layouts';

export default {
  ...RootMixin,

  mounted() {
    this.setLayout(layoutNames.SIMPLE_LAYOUT);
  },
};
