export function required(v) {
  return !!v || 'Не может быть пустым';
}

export function email(v) {
  const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return EMAIL_REGEX.test(v) || 'Неверный формат адреса электронной почты';
}

export function passwordLength(symbolsCount) {
  return (v) =>
    (v || '').length > symbolsCount ||
    `Пароль должен быть длиннее ${symbolsCount} символов`;
}
