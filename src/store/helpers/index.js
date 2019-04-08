import { mapGetters, mapMutations, mapState } from 'vuex';

export const rootComputed = {
  ...mapGetters(['iframeLoading', 'online', 'offline']),
  ...mapState(['layout']),
};

export const rootMethods = {
  ...mapMutations(['setIframeLoading', 'setLayout', 'setOnline']),
};

export * from './account';
export * from './assignments';
export * from './courses';
export * from './solutions';
