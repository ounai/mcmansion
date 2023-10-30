import { TagHumidity } from './TagHumidity';
import { TagTemperature } from './TagTemperature';
import { TagName } from './TagName';
import { TagWarning } from './TagWarning';

import type { NamedRuuviTagData } from '.';

export interface Props {
  ruuviTagData: NamedRuuviTagData
}

export const RuuviTag = ({ ruuviTagData }: Props) => (
  <center>
    <TagHumidity value={ruuviTagData.humidity} />
    <TagTemperature value={ruuviTagData.temperature} />
    <TagName value={ruuviTagData.name} />

    <TagWarning ruuviTagData={ruuviTagData} />
  </center>
);
