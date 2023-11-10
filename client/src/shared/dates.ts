import { locale } from '../app';

export const formatTime = (date: Date, includeSeconds = false): string =>
  new Intl.DateTimeFormat(locale, {
    timeStyle: includeSeconds ? 'medium' : 'short'
  }).format(date);

export const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat(locale).format(date);
