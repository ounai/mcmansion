export const formatTime = (locale: string, date: Date, includeSeconds = false): string =>
  new Intl.DateTimeFormat(locale, {
    timeStyle: includeSeconds ? 'medium' : 'short'
  }).format(date);

export const formatDate = (locale: string, date: Date): string =>
  new Intl.DateTimeFormat(locale).format(date);
