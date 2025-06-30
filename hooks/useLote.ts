// hooks/useLote.ts
import api from '@/services/api';
import type { Lote } from '@/types/lote';
import { useEffect, useState } from 'react';


export const useLote = (loteId: string) => {
  const [lote, setLote] = useState<Lote | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const fetchLote = async () => {
      try {
        const response = await api.get<Lote>(`/lotes/${loteId}`);
        setLote(response.data);
      } catch (err) {
        console.error('Erro ao buscar lote:', err);
        setErro('Erro ao carregar o lote');
      } finally {
        setLoading(false);
      }
    };

    if (loteId) {
      fetchLote();
    }
  }, [loteId]);

  return { lote, loading, erro };
};
