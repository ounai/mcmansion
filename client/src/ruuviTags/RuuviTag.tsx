import { useContext, useMemo, type CSSProperties } from 'react';

import { Modal, useToggle } from '../shared';
import { RuuviTagDataContext, type NamedRuuviTagData } from '.';
import { RuuviTagLiveChart } from './RuuviTagLiveChart';
import { TagHumidity } from './TagHumidity';
import { TagTemperature } from './TagTemperature';
import { TagName } from './TagName';
import { TagWarning } from './TagWarning';

export interface Props {
  ruuviTagData: NamedRuuviTagData
}

const style: CSSProperties = {
  textAlign: 'center',
  width: '100%',
  height: '100%'
};

export const RuuviTag = ({ ruuviTagData }: Props) => {
  const { measurementHistoryRef } = useContext(RuuviTagDataContext);
  const [showChart, toggleShowChart] = useToggle();

  const chartElement = useMemo(() => (
    <RuuviTagLiveChart
      tagId={ruuviTagData.tagId}
      tagName={ruuviTagData.name}
      measurementHistoryRef={measurementHistoryRef}
    />
  ), [ruuviTagData.tagId, ruuviTagData.name, measurementHistoryRef]);

  return (
    <>
      <Modal size="xl" show={showChart} onHide={toggleShowChart}>
        {chartElement}
      </Modal>

      <div style={style} onClick={toggleShowChart}>
        <TagHumidity value={ruuviTagData.humidity} />
        <TagTemperature value={ruuviTagData.temperature} />
        <TagName value={ruuviTagData.name} />

        <TagWarning ruuviTagData={ruuviTagData} />
      </div>
    </>
  );
};
