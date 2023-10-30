interface Props {
  value: string
}

export const TagHumidity = ({ value }: Props) => (
  <div>
    💧 {Number(value).toFixed(0)} %
  </div>
);
