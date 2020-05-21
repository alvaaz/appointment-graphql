import React from 'react';
import { useTheme } from './ModalContext';
import styled from 'styled-components';

const Mask = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
`;

export const ModalRoot = () => {
  const { theme } = useTheme();
  return <>{theme ? <Mask>{theme}</Mask> : null}</>;
};
