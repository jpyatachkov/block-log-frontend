import StorageService from './storage';

const DOMAIN = process.env.VUE_APP_DOMAIN;
const EDITOR_REDIRECT_URL = process.env.VUE_APP_EDITOR_REDIRECT_URL;

const AUTOSAVE_KEY = 'BLOCKLOG_AUTOSAVE';
const PROGRAM_KEY = 'BLOCKLOG_PROGRAM';
const REDIRECT_KEY = 'BLOCKLOG_REDIRECT';
const UPLOAD_BUTTON_KEY = 'BLOCKLOG_UPLOAD_BUTTON';

export default {
  ...StorageService,

  clearAutosavedProgram() {
    this.__set(AUTOSAVE_KEY, null);
    return this;
  },

  clearButtonText() {
    this.__set(UPLOAD_BUTTON_KEY, null);
    return this;
  },

  clearProgram() {
    this.__set(PROGRAM_KEY, null);
    return this;
  },

  clearRedirectURL() {
    this.__set(REDIRECT_KEY, null);
    return this;
  },

  getAutosavedProgram() {
    return this.__get(AUTOSAVE_KEY, false);
  },

  getProgram() {
    return this.__get(PROGRAM_KEY, false);
  },

  getRedirectURL() {
    return this.__get(REDIRECT_KEY);
  },

  openEditor() {
    location.replace(EDITOR_REDIRECT_URL);
  },

  setAutosavedProgram(program) {
    this.__set(AUTOSAVE_KEY, program);
    return this;
  },

  setButtonText(text) {
    this.__set(UPLOAD_BUTTON_KEY, text);
    return this;
  },

  setProgram(program) {
    this.__set(PROGRAM_KEY, program);
    return this;
  },

  setRedirectURL(url) {
    this.__set(REDIRECT_KEY, `${DOMAIN}${url}`);
    return this;
  },
};
