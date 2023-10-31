import { Modal, type Props as ModalProps } from '../shared/Modal';
import { RuuviTagSelector } from '../ruuviTags';

type Props = Pick<ModalProps, 'show' | 'onHide'>;

export const SettingsModal = ({ show, onHide }: Props) => (
  <Modal title="Settings" show={show} onHide={onHide} size="lg" centered>
    <RuuviTagSelector />
  </Modal>
);
