import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { formatTime, useT } from '../shared';
import { useLocale } from '../app';

import type { RuuviTagHourlyData } from '.';

interface Props {
  ruuviTagHourlyData: RuuviTagHourlyData[]
  tagName: string
}

const formatNumber = (n: number): number =>
  Math.round(n * 100) / 100;

const useOptions = (hourlyData: RuuviTagHourlyData[], tagName: string): Highcharts.Options => {
  const t = useT();
  const locale = useLocale();

  const categories = hourlyData.map(({ startDate }) => formatTime(locale, new Date(startDate)));
  const data = hourlyData.map(({ temperatureAvg }) => formatNumber(Number(temperatureAvg)));

  return {
    title: {
      text: tagName
    },
    accessibility: {
      enabled: false
    },
    xAxis: {
      tickInterval: 3,
      categories
    },
    yAxis: {
      title: {
        text: null
      },
      min: Math.min(...data.map(v => Math.floor(v))),
      max: Math.max(...data.map(v => Math.ceil(v)))
    },
    series: [{
      type: 'line',
      name: t('ruuviTags.chart.averageTemperature'),
      data
    }],
    legend: {
      enabled: false
    }
  };
};

export const RuuviTagChart = ({ ruuviTagHourlyData, tagName }: Props) => (
  <HighchartsReact
    highcharts={Highcharts}
    options={useOptions(ruuviTagHourlyData, tagName)}
  />
);
