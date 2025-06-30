import Loading from '@/components/Loading';
import api from '@/services/api';
import { styles } from "@/src/styles/styles";
import type { Lote } from '@/types/lote';
import type { Registro } from '@/types/registro';
import React, { useEffect, useState } from 'react';
import { SectionList, Text, View } from 'react-native';

export default function HomeScreen() {
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true); // estado de loading

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get<Lote[]>('/lotes'),
      api.get<Registro[]>('/registro'),
    ])
      .then(([lotesRes, registrosRes]) => {
        setLotes(lotesRes.data);
        setRegistros(registrosRes.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false)); // desliga loading
  }, []);

  if (loading) {
    return <Loading />;
  }

  const renderLoteItem = ({ item }: { item: Lote }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Galpão: {item.galpao}</Text>
      <Text>Raça: {item.raca}</Text>
      <Text>Procedência: {item.procedencia}</Text>
      <Text>Aves início do mês: {item.numeroAvesInicioMes}</Text>
    </View>
  );

  const renderRegistroItem = ({ item }: { item: Registro }) => (
    <View style={[styles.card, { backgroundColor: '#FFF3E0' }]}>
      <Text style={[styles.title, { color: '#FB8C00' }]}>
        Data: {new Date(item.data).toLocaleDateString()}
      </Text>
      <Text>Ovos: {item.totalOvos}</Text>
      <Text>Mortes: {item.mortas}</Text>
      <Text>Ração: {item.racaoKg} kg</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.sectionHeader}>🎉 Seja bem-vindo novamente {lotes[0]?.proprietario || 'Hamerson'}</Text>
      <Text style={styles.sectionHeader}>📦 Dados  do Lote</Text>
      <SectionList
        sections={[{ title: 'Lotes', data: lotes }]}
        keyExtractor={(item: Lote, index) => item.id + '-' + index}
        renderItem={renderLoteItem}
        renderSectionHeader={undefined}
        contentContainerStyle={{ padding: 20, paddingBottom: 20 }}
        ListEmptyComponent={<Text>Nenhum lote disponível.</Text>}
      />
      <Text style={styles.sectionHeader}>📅 Registros Diários</Text>
      <SectionList
        sections={[{ title: 'Registros', data: registros }]}
        keyExtractor={(item: Registro, index) => item.id + '-' + index}
        renderItem={renderRegistroItem}
        renderSectionHeader={undefined}
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        ListEmptyComponent={<Text>Nenhum registro disponível.</Text>}
      />
    </View>
  );
}
