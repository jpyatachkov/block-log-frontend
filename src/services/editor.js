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

export default {
  ...StorageService,

  __getEmptyProgram() {
    return null;
  },

  __getIframeKey(key) {
    const payload = {
      key,
    };
    bus.$emit(EVENTS.GET_EDITOR_IFRAME_KEY, payload);
  },

  __removeIframeKey(key) {
    const payload = {
      key,
    };
    bus.$emit(EVENTS.REMOVE_EDITOR_IFRAME_KEY, payload);
  },

  __setIframeKey(key, value) {
    const payload = {
      key,
      value,
    };
    bus.$emit(EVENTS.SET_EDITOR_IFRAME_KEY, payload);
  },

  clearAutosavedProgram() {
    this.__remove(LOCAL_STORAGE_KEYS.AUTOSAVE);
    this.__removeIframeKey(LOCAL_STORAGE_KEYS.AUTOSAVE);
    return this;
  },

  clearButtonText() {
    this.__remove(LOCAL_STORAGE_KEYS.UPLOAD_BUTTON_TEXT);
    this.__removeIframeKey(LOCAL_STORAGE_KEYS.UPLOAD_BUTTON_TEXT);
    return this;
  },

  clearEditorContent() {
    return this.clearAutosavedProgram()
      .clearButtonText()
      .clearProgram()
      .clearRedirectURL();
  },

  clearProgram() {
    this.__remove(LOCAL_STORAGE_KEYS.PROGRAM);
    this.__removeIframeKey(LOCAL_STORAGE_KEYS.PROGRAM);
    return this;
  },

  clearRedirectURL() {
    this.__remove(LOCAL_STORAGE_KEYS.REDIRECT_URL);
    this.__removeIframeKey(LOCAL_STORAGE_KEYS.REDIRECT_URL);
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
    this.__setIframeKey(
      LOCAL_STORAGE_KEYS.AUTOSAVE,
      program || this.__getEmptyProgram(),
    );
    return this;
  },

  setButtonText(text) {
    this.__setIframeKey(LOCAL_STORAGE_KEYS.UPLOAD_BUTTON_TEXT, text);
    return this;
  },

  setProgram(program) {
    this.__setIframeKey(
      LOCAL_STORAGE_KEYS.PROGRAM,
      program || this.__getEmptyProgram(),
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
    return this;
  },
};
