import type { CSSProperties } from 'react';

import { useT } from '../shared';

import type { StoptimeWithoutPattern } from '.';

interface Props {
  stoptimes: StoptimeWithoutPattern[]
}

const getLineColor = (line: string): string => {
  const blue = '#007ac9';
  const orange = '#ff6319';
  const violet = '#8c4799';

  if (line.startsWith('M')) {
    return orange;
  } else if (/^[A-Z]$/.test(line)) {
    return violet;
  } else {
    return blue;
  }
};

const getCancelledColor = (stoptime: StoptimeWithoutPattern) =>
  (stoptime.realtimeState === 'CANCELED')
    ? { color: 'red' }
    : {};

const getCancelledDecoration = (stoptime: StoptimeWithoutPattern) =>
  (stoptime.realtimeState === 'CANCELED')
    ? { textDecoration: 'line-through' }
    : {};

export const Stoptimes = ({ stoptimes }: Props) => {
  const t = useT();

  const getTime = (stoptime: StoptimeWithoutPattern) => {
    const now = new Date();
    const date = new Date((stoptime.serviceDay + (stoptime.realtimeDeparture ?? stoptime.scheduledDeparture)) * 1000);

    let diffMinutes = Math.floor((date.getTime() - now.getTime()) / 60_000);

    if (diffMinutes < 0) {
      if (diffMinutes >= -10) diffMinutes = 0;
      else diffMinutes += 24 * 60;
    }

    const style: CSSProperties = {
      fontWeight: '600'
    };

    if (stoptime.realtime) {
      style.color = '#00985f';
    }

    return (
      <span style={style}>
        {diffMinutes === 0
          ? t('transit.stoptimes.now')
          : diffMinutes < 60
            ? t('transit.stoptimes.minutes', { minutes: diffMinutes })
            : `${date.getHours()}.${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`}
      </span>
    );
  };

  return (
    <center>
      <table style={{
        fontSize: '14px',
        tableLayout: 'fixed'
      }}>
        <tbody>
          {stoptimes.map(stoptime => (
            <tr key={JSON.stringify(stoptime)}>
              <td style={{
                paddingRight: '4px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                color: getLineColor(stoptime.trip.route.shortName)
              }}>
                <strong>
                  {stoptime.trip.route.shortName}
                </strong>
              </td>

              <td style={{
                maxWidth: '100px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                ...getCancelledDecoration(stoptime)
              }}>
                {stoptime.headsign
                  .split(' via ')[0]
                  .replace(/via$/, '')
                  .replace('(M)', '')
                  .trim()}
              </td>

              <td
                className="text-muted"
                style={{
                  fontSize: '12px',
                  verticalAlign: 'middle',
                  paddingLeft: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden'
                }}
              >
                <span style={getCancelledColor(stoptime)}>
                  {stoptime.realtimeState === 'CANCELED'
                    ? t('transit.stoptimes.canceled')
                    : getTime(stoptime)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </center>
  );
};
