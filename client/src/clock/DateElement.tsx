import { formatDate } from '../shared';
import { useLocale } from '../app';

interface Props {
  date: Date
}

export const DateElement = ({ date }: Props) => (
  <strong>
    {formatDate(useLocale(), date)}
  </strong>
);
