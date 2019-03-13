import { mapGetters, mapMutations, mapState } from 'vuex';

/**
 * @typedef {object} RootComputed
 * @property {boolean} online
 * @property {boolean} offline
 * @property {string} layout
 */

/**
 * @type {RootComputed}
 */
// @ts-ignore
export const rootComputed = {
  ...mapGetters(['online', 'offline']),
  ...mapState(['layout']),
};

/**
 * @typedef {object} RootMethods
 * @property {{(layout: string): void}} setLayout
 * @property {{(online: boolean): void}} setOnline
 */

/**
 * @type {RootMethods}
 */
// @ts-ignore
export const rootMethods = {
  ...mapMutations(['setLayout', 'setOnline']),
};

export * from './account';
export * from './courses';
