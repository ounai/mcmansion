import { useSelector } from '../state';
import { selectLocale } from '../state/appSettings';

export const useLocale = (): string => useSelector(selectLocale);
