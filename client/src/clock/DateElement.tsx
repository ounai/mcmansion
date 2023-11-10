import { formatDate } from '../shared';

interface Props {
  date: Date
}

export const DateElement = ({ date }: Props) => (
  <strong>
    {formatDate(date)}
  </strong>
);
