type LogMeta = Record<string, unknown>;

function log(
  method: 'info' | 'warn' | 'error',
  metaOrMessage: LogMeta | string,
  message?: string
): void {
  if (typeof metaOrMessage === 'string') {
    console[method](metaOrMessage);
  } else {
    console[method](message ?? '', metaOrMessage);
  }
}

export const logger = {
  info: (metaOrMessage: LogMeta | string, message?: string) =>
    log('info', metaOrMessage, message),
  warn: (metaOrMessage: LogMeta | string, message?: string) =>
    log('warn', metaOrMessage, message),
  error: (metaOrMessage: LogMeta | string, message?: string) =>
    log('error', metaOrMessage, message)
};
