import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: absolute;
  width: 520px;
  z-index: 2;
  background-color: white;
  border: none;
  border-radius: 8px;
  left: 50%;
  transform: translateX(-50%);
  top: 20vh;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
`;

export const ModalBody = styled.div`
  padding: 24px;
  font-size: 14px;
  line-height: 1.5715;
  word-wrap: break-word;
`;

export const ModalContent = styled.div`
  display: flex;
`;

export const Header = styled.div`
  padding: 16px 24px;
  color: rgba(0, 0, 0, 0.65);
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 2px 2px 0 0;
`;

export const ButtonClose = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  padding: 0;
  color: rgba(0, 0, 0, 0.45);
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  background: 0 0;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: color 0.3s;
`;

export const ModalTitle = styled.div`
  margin: 0;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  word-wrap: break-word;
`;

export const ModalFooter = styled.div`
  padding: 10px 16px;
  text-align: right;
  background: 0 0;
  border-top: 1px solid #f0f0f0;
  border-radius: 0 0 2px 2px;
`;
