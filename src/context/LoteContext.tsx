import React, { createContext, ReactNode, useContext } from 'react';
import { useLote } from '../../hooks/useLote';
import type { Lote } from '../../types/lote';

const loteId = '6862b18f89bc9001c2c7ad58'; // ID fixo da fazenda

interface LoteContextProps {
  lote: Lote | null;  // aceitar null
  loading: boolean;
  erro: string | null;
}

const LoteContext = createContext<LoteContextProps>({
  lote: null,
  loading: true,
  erro: null,
});

export const useLoteContext = () => useContext(LoteContext);

export const LoteProvider = ({ children }: { children: ReactNode }) => {
  const { lote, loading, erro } = useLote(loteId);

  return (
    <LoteContext.Provider value={{ lote, loading, erro }}>
      {children}
    </LoteContext.Provider>
  );
};
