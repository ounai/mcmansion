import type { ChangeEvent } from 'react';

import Form from 'react-bootstrap/Form';

import { useLocale } from '.';
import { useDispatch } from '../state';
import { setLocale } from '../state/appSettings';

export const AppSettings = () => {
  const locale = useLocale();
  const dispatch = useDispatch();

  const localeOptions = {
    'en-US': 'English',
    'fi-FI': 'Finnish'
  };

  const onChangeLocale = (event: ChangeEvent<HTMLSelectElement>) =>
    dispatch(setLocale(event.currentTarget.value as keyof typeof localeOptions));

  return (
    <div>
      <strong>Locale</strong>

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
