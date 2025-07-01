// hooks/useRegister.ts
import api from '@/services/api';
import type { Registro } from '@/types/registro';
import { useEffect, useState } from 'react';

export const useRegister = () => {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await api.get<Registro[]>('/registro');
        setRegistros(response.data);
      } catch (err) {
        console.error('Erro ao buscar registros:', err);
        setErro('Erro ao carregar os registros');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistros(); // ✅ chamada correta
  }, []);

  return { registros, loading, erro };
};
