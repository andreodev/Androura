import Loading from '@/components/Loading';
import api from '@/services/api';
import { useLoteContext } from '@/src/context/LoteContext';
import type { Registro } from '@/types/registro';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Button, SectionList, StyleSheet, Text, View } from 'react-native';
import CardsHome from '../components/cards';

export default function HomeScreen() {
  const { lote, loading: loadingLote, erro } = useLoteContext();
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [loadingRegistros, setLoadingRegistros] = useState(true);

  const hoje = new Date();
  const [mesSelecionado, setMesSelecionado] = useState(hoje.getMonth());
  const [anoSelecionado, setAnoSelecionado] = useState(hoje.getFullYear());
  const [showPicker, setShowPicker] = useState(false);

  const loadRegistros = async () => {
    if (!lote?.id) return;

    setLoadingRegistros(true);
    try {
      const res = await api.get<Registro[]>(`/registro/por-data?mes=${mesSelecionado + 1}&ano=${anoSelecionado}`);
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

  const onChangeDate = (_event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setMesSelecionado(selectedDate.getMonth());
      setAnoSelecionado(selectedDate.getFullYear());
    }
  };

  const nomeProprietario = lote?.proprietario?.trim() || 'Hamerson';
  const loading = loadingLote || loadingRegistros;

  const renderRegistroItem = ({ item }: { item: Registro }) => (
    <View style={[styles.card, { backgroundColor: '#FFF3E0' }]}>
      <Text style={[styles.title, { color: '#FB8C00' }]}>📅 {new Date(item.data).toLocaleDateString()}</Text>
      <Text style={styles.label}>🥚 Ovos: <Text style={styles.value}>{item.totalOvos}</Text></Text>
      <Text style={styles.label}>💀 Mortas: <Text style={styles.value}>{item.mortas}</Text></Text>
      <Text style={styles.label}>🌽 Ração: <Text style={styles.value}>{item.racaoKg} kg</Text></Text>
    </View>
  );

  if (loading) return <Loading />;
  if (erro) return <Text style={{ color: 'red', padding: 20 }}>{erro}</Text>;

  return (
    <View style={styles.container}>
      <SectionList
        sections={[{ title: 'Registros', data: registros }]}
        keyExtractor={(item, index) => item.id + '-' + index}
        renderItem={renderRegistroItem}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        ListHeaderComponent={
          <View>
            <Text style={styles.sectionHeader}>🌾 Bem-vindo {nomeProprietario}</Text>

            <Text style={styles.input} onPress={() => setShowPicker(true)}>
              {`${new Date(0, mesSelecionado + 1).toLocaleString('pt-BR', { month: 'long' })} / ${anoSelecionado}`}
            </Text>

            {showPicker && (
              <DateTimePicker
                value={new Date(anoSelecionado, mesSelecionado, 1)}
                mode="date"
                display="default"
                onChange={onChangeDate}
                maximumDate={new Date()}
              />
            )}

            <View style={styles.button}>
              <Button title="🚜 Atualizar Registros" onPress={loadRegistros} color="#388E3C" />
            </View>

            <CardsHome registros={registros} mesSelecionado={mesSelecionado} anoSelecionado={anoSelecionado} lote={lote} />

            <Text style={[styles.sectionHeader, { marginTop: 16 }]}>📅 Registros Diários</Text>

            {registros.length === 0 && (
              <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum registro encontrado.</Text>
            )}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5DC' },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4E342E',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: '#FFF8DC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  label: { fontSize: 14, color: '#4E342E', marginTop: 4, fontWeight: '500' },
  value: { fontWeight: 'bold', color: '#388E3C' },
  button: {
    marginVertical: 10,
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  input: {
    padding: 12,
    backgroundColor: '#FFF8DC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    color: '#4E342E',
    fontWeight: '500',
    marginBottom: 12,
    textAlign: 'center',
  },
});
