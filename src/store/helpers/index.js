import { mapGetters, mapMutations, mapState } from 'vuex';

export const rootComputed = {
  ...mapGetters(['online', 'offline']),
  ...mapState(['layout']),
};

export const rootMethods = {
  ...mapMutations(['setLayout', 'setOnline']),
};

export * from './account';
export * from './assignments';
export * from './courses';
export * from './solutions';
