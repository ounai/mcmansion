import { formatDate, useLocale } from '../shared';

interface Props {
  date: Date
}

export const DateElement = ({ date }: Props) => (
  <strong>
    {formatDate(useLocale(), date)}
  </strong>
);
