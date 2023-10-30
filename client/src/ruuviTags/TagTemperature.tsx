interface Props {
  value: string
}

export const TagTemperature = ({ value }: Props) => (
  <div style={{
    fontFamily: 'Arial',
    marginTop: '-6px',
    marginBottom: '-6px'
  }}>
    <strong style={{ fontSize: '40px' }}>
      {Number(value).toFixed(1)}
    </strong>

    <div style={{
      marginLeft: '4px',
      fontSize: '20px',
      marginTop: '9px',
      display: 'inline-block',
      verticalAlign: 'top'
    }}>
      <strong>°</strong>C
    </div>
  </div>
);
