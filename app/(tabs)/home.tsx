import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import api from '../../services/api';
import { useLoteContext } from '../../src/context/LoteContext';
import type { Registro } from '../../types/registro';
import ListaRegistros from '../components/ListaRegistro';

export default function HomeScreen() {
  const { lote, loading: loadingLote, erro } = useLoteContext();
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [loadingRegistros, setLoadingRegistros] = useState(true);

  const hoje = new Date();
  const [mesSelecionado, setMesSelecionado] = useState(hoje.getMonth());
  const [anoSelecionado, setAnoSelecionado] = useState(hoje.getFullYear());

  const loadRegistros = async () => {
    if (!lote?.id) return;

    setLoadingRegistros(true);
    try {
      const res = await api.get<Registro[]>(
        `/registro/por-data?mes=${mesSelecionado + 1}&ano=${anoSelecionado}`,
      );
      setRegistros(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRegistros(false);
    }
  };

  useEffect(() => {
    if (lote?.id) loadRegistros();
  }, [lote, mesSelecionado, anoSelecionado]);

  useFocusEffect(
    useCallback(() => {
      if (lote?.id) {
        loadRegistros();
      }
    }, [lote, mesSelecionado, anoSelecionado])
  );

  const handleExcluirRegistro = async (id: string) => {
    try {
      await api.delete(`/registro/${id}`);
      setRegistros(prev => prev.filter(r => r.id !== id));
      Toast.show({
        type: 'success',
        text1: 'Registro excluído com sucesso!',
      });
    } catch (err) {
      console.error('Erro ao excluir registro:', err);
      Toast.show({
        type: 'error',
        text1: 'Erro ao excluir registro',
      });
    }
  };

  const nomeProprietario = lote?.proprietario?.trim() || 'Hamerson';
  const loading = loadingLote || loadingRegistros;

  return (
    <ListaRegistros
      registros={registros}
      onExcluir={handleExcluirRegistro}
      mesSelecionado={mesSelecionado}
      anoSelecionado={anoSelecionado}
      onChangeData={(mes, ano) => {
        setMesSelecionado(mes);
        setAnoSelecionado(ano);
      }}
      onAtualizar={loadRegistros}
      nomeProprietario={nomeProprietario}
      loading={loading}
      erro={erro ?? undefined}
    />
  );
}
