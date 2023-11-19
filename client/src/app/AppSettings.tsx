import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import Form from 'react-bootstrap/Form';

import { useLocale } from '.';
import { useDispatch } from '../state';
import { setLocale } from '../state/appSettings';
import { useT } from '../shared';

export const AppSettings = () => {
  const t = useT();
  const locale = useLocale();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const localeOptions = {
    'en-US': t('settings.app.locale.english'),
    'fi-FI': t('settings.app.locale.finnish')
  };

  const onChangeLocale = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.currentTarget.value as keyof typeof localeOptions;

    dispatch(setLocale(newLocale));
    void i18n.changeLanguage(newLocale.slice(0, 2));
  };

  return (
    <div>
      <strong>
        {t('settings.app.localeHeading')}
      </strong>

      <Form.Select onChange={onChangeLocale} defaultValue={locale}>
        {Object.entries(localeOptions).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};
