export * from './RuuviTags';
export * from './RuuviTagSelector';
export * from './RuuviTagDataContext';

export interface RuuviTagData {
  tagId: string
  dataFormat: number
  rssi: number
  temperature: string
  humidity: string
  pressure: number
  accelerationX: number
  accelerationY: number
  accelerationZ: number
  battery: number
  txPower: number
  movementCounter: number
  measurementSequenceNumber: number
  mac: string
  createdAt: string
  updatedAt: string
}

export interface RuuviTagSelection {
  tagId: string
  name: string
}

export type NamedRuuviTagData = RuuviTagData & Pick<RuuviTagSelection, 'name'>;
