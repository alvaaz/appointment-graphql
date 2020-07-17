import React from 'react';
import ReactDOM from 'react-dom';
import { ModalBody, ModalContent, ModalWrapper, ModalMask } from './style';
import { useTheme } from './ModalContext';
import { useComponentVisible } from '../../hooks';

const IconWarning = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="exclamation-circle"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    style={{ fontSize: '22px', color: '#faad14', marginRight: '16px' }}
  >
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
    <path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"></path>
  </svg>
);

export const Modal = () => {
  const { modalContent, setModalContent } = useTheme();

  const { ref } = useComponentVisible(false, setModalContent);

  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) return null;

  if (modalContent) {
    return ReactDOM.createPortal(
      <ModalMask>
        <ModalWrapper ref={ref}>
          <ModalBody>
            <ModalContent>
              <IconWarning />
              {modalContent}
            </ModalContent>
          </ModalBody>
        </ModalWrapper>
      </ModalMask>,
      modalRoot
    );
  } else return null;
};
