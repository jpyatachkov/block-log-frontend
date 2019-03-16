export function colorValidator(v) {
  return ['success', 'info', 'warning', 'error'].includes(v);
}

export function iconValidator(v) {
  return v === undefined || v instanceof String || typeof v === 'string';
}
