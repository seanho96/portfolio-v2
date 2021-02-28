import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
`;
const ModalCard = styled.div`
  position: relative;
  z-index: 210;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
  max-width: 48rem;

  @media (max-width: 800px) {
    width: 90%;
  }

  @media (max-width: 425px) {
    width: 95%;
  }

  img {
    width: 100%;
    border-radius: var(--border-radius);
  }
`;
const CloseButton = styled.button`
  ${({ theme }) => theme.mixins.smallButton};
  margin-top: 24px;
  width: 200px;
  font-size: var(--fz-xs);

  @media (max-width: 375px) {
    width: 100%;
  }
`;

const Modal = ({ is_open, closeModal, img_src }) => {
  const handleEscape = e => {
    if (e.keyCode === 27) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false);

    return () => {
      document.removeEventListener('keydown', handleEscape, false);
    };
  }, []);

  return (
    is_open && (
      <ModalWrapper onClick={closeModal}>
        <ModalCard onClick={e => e.stopPropagation()}>
          <img src={img_src} alt="testing" loading="lazy" />
          <CloseButton onClick={closeModal}>Close</CloseButton>
        </ModalCard>
      </ModalWrapper>
    )
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func,
  img_src: PropTypes.string,
  is_open: PropTypes.bool.isRequired,
};

export default Modal;
