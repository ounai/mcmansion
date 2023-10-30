interface Props {
  value: string
}

export const TagName = ({ value }: Props) => (
  <div style={{
    fontWeight: 'bold',
    fontFamily: 'Arial'
  }}>
    {value}
  </div>
);
