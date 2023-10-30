import type { CSSProperties } from 'react';

import { TagHumidity } from './TagHumidity';
import { TagTemperature } from './TagTemperature';
import { TagName } from './TagName';
import { TagWarning } from './TagWarning';

import type { NamedRuuviTagData } from '.';

export interface Props {
  ruuviTagData: NamedRuuviTagData
}

const style: CSSProperties = {
  textAlign: 'center'
};

export const RuuviTag = ({ ruuviTagData }: Props) => (
  <div style={style}>
    <TagHumidity value={ruuviTagData.humidity} />
    <TagTemperature value={ruuviTagData.temperature} />
    <TagName value={ruuviTagData.name} />

    <TagWarning ruuviTagData={ruuviTagData} />
  </div>
);
