import { useLote } from '@/hooks/useLote';
import type { Lote } from '@/types/lote';
import React, { createContext, ReactNode, useContext } from 'react';

const loteId = '68605633a1adf0d343379193'; // ID fixo da fazenda

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
