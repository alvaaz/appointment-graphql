import React, { createContext, ReactNode, useContext } from 'react';
import { Modal } from '../Modal';
interface ProfileState {
  modalContent: ReactNode;
  setModalContent: React.Dispatch<React.SetStateAction<ReactNode>>;
}

function createCtx<ProfileState>() {
  const ctx = createContext<ProfileState | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

export const [useTheme, CtxProvider] = createCtx<ProfileState>();

export const ThemeProvider: React.FC = ({ children }) => {
  const [modalContent, setModalContent] = React.useState<ReactNode | null>(
    null
  );
  return (
    <CtxProvider value={{ modalContent, setModalContent }}>
      <Modal />
      {children}
    </CtxProvider>
  );
};
