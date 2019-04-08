import Vue from 'vue';

let EventBus = new Vue();

export function initEventBus() {
  EventBus = new Vue();
}

export default EventBus;

export { default as EVENTS } from './events';
