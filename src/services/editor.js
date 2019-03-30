import StorageService from './storage';

const EDITOR_REDIRECT_URL = process.env.VUE_APP_EDITOR_REDIRECT_URL;

const AUTOSAVE_KEY = 'BLOCKLOG_AUTOSAVE';
const PROGRAM_KEY = 'BLOCKLOG_PROGRAM';
const UPLOAD_BUTTON_KEY = 'BLOCKLOG_UPLOAD_BUTTON';

export default {
  ...StorageService,

  clearAutosavedProgram() {
    return this.__set(AUTOSAVE_KEY, null);
  },

  clearButtonText() {
    return this.__set(UPLOAD_BUTTON_KEY, null);
  },

  clearProgram() {
    return this.__set(PROGRAM_KEY, null);
  },

  getAutosavedProgram() {
    return this.__get(AUTOSAVE_KEY, false);
  },

  getProgram() {
    return this.__get(PROGRAM_KEY, false);
  },

  openEditor() {
    location.replace(EDITOR_REDIRECT_URL);
  },

  setAutosavedProgram(program) {
    return this.__set(AUTOSAVE_KEY, program);
  },

  setButtonText(text) {
    return this.__set(UPLOAD_BUTTON_KEY, text);
  },

  setProgram(program) {
    return this.__set(PROGRAM_KEY, program);
  },
};
