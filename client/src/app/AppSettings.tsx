import type { ChangeEvent } from 'react';

import Form from 'react-bootstrap/Form';

import { useLocale } from '.';
import { useDispatch } from '../state';
import { setLocale } from '../state/appSettings';
import { useT } from '../shared';

export const AppSettings = () => {
  const t = useT();
  const locale = useLocale();
  const dispatch = useDispatch();

  const localeOptions = {
    'en-US': t('settings.app.locale.english'),
    'fi-FI': t('settings.app.locale.finnish')
  };

  const onChangeLocale = (event: ChangeEvent<HTMLSelectElement>) =>
    dispatch(setLocale(event.currentTarget.value as keyof typeof localeOptions));

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
