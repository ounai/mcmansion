/* eslint-disable prefer-arrow-callback, prefer-arrow/prefer-arrow-functions */

import { useRef, useEffect, type RefObject } from 'react';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

import { useT } from '../shared';

import type { MeasurementHistory } from '.';

interface Props {
  tagId: string
  tagName: string
  measurementHistoryRef: RefObject<MeasurementHistory>
}

const formatNumber = (n: number): number =>
  Math.round(n * 100) / 100;

export const RuuviTagLiveChart = ({ tagId, tagName, measurementHistoryRef }: Props) => {
  const t = useT();
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!chartRef.current || !measurementHistoryRef.current) return null;

      // eslint-disable-next-line
      const series = chartRef.current.chart.series[0];

      const measurements = measurementHistoryRef.current[tagId];
      const lastMeasurement = measurements.at(-1)!;

      // eslint-disable-next-line
      series.addPoint([
        Math.round(new Date().getTime() / 1000) * 1000,
        formatNumber(Number(lastMeasurement.temperature))
      ], true, false);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [tagId, measurementHistoryRef]);

  if (!measurementHistoryRef.current) {
    return null;
  }

  const data: [number, number][] = [];

  for (const measurement of measurementHistoryRef.current[tagId]) {
    data.push([
      Math.round(new Date(measurement.updatedAt).getTime() / 1000) * 1000,
      formatNumber(Number(measurement.temperature))
    ]);
  }

  const options: Highcharts.Options = {
    accessibility: {
      enabled: false
    },
    time: {
      useUTC: false
    },
    rangeSelector: {
      buttons: [
        {
          count: 1,
          type: 'minute',
          text: '1 min'
        },
        {
          count: 10,
          type: 'minute',
          text: '10 min'
        },
        {
          count: 60,
          type: 'minute',
          text: '60 min'
        },
        {
          count: 120,
          type: 'minute',
          text: '120 min'
        },
        {
          type: 'all',
          text: t('ruuviTags.chart.all')
        }
      ],
      inputEnabled: false,
      selected: 0,
      buttonTheme: {
        width: 60
      }
    },
    title: {
      text: tagName
    },
    exporting: {
      enabled: false
    },
    series: [{
      type: 'line',
      name: t('ruuviTags.chart.temperature'),
      data
    }]
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType="stockChart"
      options={options}
      ref={chartRef}
    />
  );
};
