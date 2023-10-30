interface Props {
  date: Date
}

export const DateElement = ({ date }: Props) => (
  <strong>
    {new Intl.DateTimeFormat('fi-FI').format(date)}
  </strong>
);
