import type { ReactNode } from 'react';

import BootstrapModal from 'react-bootstrap/Modal';

export interface Props {
  show: boolean
  onHide: () => void

  title?: string
  centered?: boolean
  size?: 'sm' | 'lg' | 'xl'

  children: ReactNode
}

export const Modal = ({ show, onHide, title, centered, size, children }: Props) => (
  <BootstrapModal show={show} onHide={onHide} centered={centered} size={size}>
    {title && (
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>
          {title}
        </BootstrapModal.Title>
      </BootstrapModal.Header>
    )}

    <BootstrapModal.Body>
      {children}
    </BootstrapModal.Body>
  </BootstrapModal>
);
