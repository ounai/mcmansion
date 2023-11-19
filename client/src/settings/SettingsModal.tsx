import type { CSSProperties } from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { Modal, type Props as ModalProps } from '../shared/Modal';
import { TransitSettings } from '../transit';
import { RuuviTagSelector } from '../ruuviTags';
import { ElectricitySettings } from '../electricityPrices';
import { AppSettings } from '../app';

type Props = Pick<ModalProps, 'show' | 'onHide'>;

const tabsStyle: CSSProperties = {
  marginBottom: '10px'
};

export const SettingsModal = ({ show, onHide }: Props) => (
  <Modal show={show} onHide={onHide} size="lg" centered>
    <Tabs id="setting-tabs" defaultActiveKey="app-settings" style={tabsStyle}>
      <Tab eventKey="app-settings" title="App">
        <AppSettings />
      </Tab>

      <Tab eventKey="transit-settings" title="Transit">
        <TransitSettings />
      </Tab>

      <Tab eventKey="ruuvi-tag-selector" title="RuuviTags">
        <RuuviTagSelector />
      </Tab>

      <Tab eventKey="electricity-settings" title="Electricity">
        <ElectricitySettings />
      </Tab>
    </Tabs>
  </Modal>
);
