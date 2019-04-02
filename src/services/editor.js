import bus, { EVENTS } from '@/bus';

import StorageService from './storage';

const DOMAIN = process.env.VUE_APP_DOMAIN;
const EDITOR_REDIRECT_URL = process.env.VUE_APP_EDITOR_REDIRECT_URL;

const LOCAL_STORAGE_KEYS = {
  AUTOSAVE: 'BLOCKLOG_AUTOSAVE',
  PROGRAM: 'BLOCKLOG_PROGRAM',
  REDIRECT_URL: 'BLOCKLOG_REDIRECT',
  UPLOAD_BUTTON_TEXT: 'BLOCKLOG_UPLOAD_BUTTON',
};

function getEmptyProgram() {
  return null;
}

export default {
  ...StorageService,

  __getIframeKey(key) {
    const payload = {
      key,
    };
    bus.$emit(EVENTS.GET_EDITOR_IFRAME_KEY, payload);
  },

  __setIframeKey(key, value) {
    const payload = {
      key,
      value,
    };
    bus.$emit(EVENTS.SET_EDITOR_IFRAME_KEY, payload);
  },

  clearAutosavedProgram() {
    this.__setIframeKey(LOCAL_STORAGE_KEYS.AUTOSAVE, getEmptyProgram());
    return this;
  },

  clearButtonText() {
    this.__setIframeKey(LOCAL_STORAGE_KEYS.UPLOAD_BUTTON_TEXT, null);
    return this;
  },

  clearProgram() {
    this.__setIframeKey(LOCAL_STORAGE_KEYS.PROGRAM, getEmptyProgram());
    return this;
  },

  clearRedirectURL() {
    this.__setIframeKey(LOCAL_STORAGE_KEYS.REDIRECT_URL, null);
    return this;
  },

  getAutosavedProgram() {
    return this.__get(LOCAL_STORAGE_KEYS.AUTOSAVE, false);
  },

  getProgram() {
    return this.__get(LOCAL_STORAGE_KEYS.PROGRAM, false);
  },

  getRedirectURL() {
    return this.__get(LOCAL_STORAGE_KEYS.REDIRECT_URL, false);
  },

  openEditor() {
    location.replace(EDITOR_REDIRECT_URL);
  },

  setAutosavedProgram(program) {
    this.__setIframeKey(LOCAL_STORAGE_KEYS.AUTOSAVE, program);
    return this;
  },

  setButtonText(text) {
    this.__setIframeKey(LOCAL_STORAGE_KEYS.UPLOAD_BUTTON_TEXT, text);
    return this;
  },

  setProgram(program) {
    this.__setIframeKey(
      LOCAL_STORAGE_KEYS.PROGRAM,
      program || getEmptyProgram(),
    );
    return this;
  },

  setRedirectURL(url) {
    this.__setIframeKey(LOCAL_STORAGE_KEYS.REDIRECT_URL, `${DOMAIN}${url}`);
    return this;
  },

  updateLocalStorage() {
    Object.values(LOCAL_STORAGE_KEYS).forEach((iframeKey) =>
      this.__getIframeKey(iframeKey),
    );
  },
};
