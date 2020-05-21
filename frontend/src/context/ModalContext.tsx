import React, { createContext, ReactNode, useContext, useEffect } from 'react';

interface ProfileState {
  theme: ReactNode;
  setTheme: React.Dispatch<React.SetStateAction<ReactNode>>;
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
  const [theme, setTheme] = React.useState<ReactNode | null>(null);
  return <CtxProvider value={{ theme, setTheme }}>{children}</CtxProvider>;
};
