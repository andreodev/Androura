import api from '@/services/api';
import type { Lote } from '@/types/lote';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default function CadastroRegistro() {
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [loteId, setLoteId] = useState('');
  const [dataObj, setDataObj] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [coletas, setColetas] = useState('');
  const [totalOvos, setTotalOvos] = useState('');
  const [eliminadas, setEliminadas] = useState('');
  const [mortas, setMortas] = useState('');
  const [totalAves, setTotalAves] = useState('');
  const [racaoKg, setRacaoKg] = useState('');
  const [observacoes, setObservacoes] = useState('');


  useEffect(() => {
    api.get<Lote[]>('/lotes')
      .then(res => {
        setLotes(res.data);
        if (res.data.length > 0) setLoteId(res.data[0].id);
      })
      .catch(err => console.error(err));
  }, []);

  // ** NOVO: calcula totalOvos a partir das coletas **
  useEffect(() => {
    if (!coletas) {
      setTotalOvos('');
      return;
    }
    const soma = coletas
      .split(',')
      .map(c => Number(c.trim()))
      .filter(n => !isNaN(n))
      .reduce((acc, cur) => acc + cur, 0);
    setTotalOvos(soma.toString());
  }, [coletas]);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDataObj(selectedDate);
  };

  const handleSalvar = async () => {
    if (!loteId || !dataObj) {
      Alert.alert('Erro', 'Preencha os campos obrigatórios (lote e data).');
      return;
    }

    const registroPayload = {
  loteId,
  dia: dataObj.getUTCDate(),
  data: dataObj.toISOString(), // ⬅ Aqui
  coletas: coletas
    ? coletas.split(',').map(c => Number(c.trim())).filter(n => !isNaN(n))
    : [],
  totalOvos: Number(totalOvos) || 0,
  eliminadas: Number(eliminadas) || 0,
  mortas: Number(mortas) || 0,
  racaoKg: Number(racaoKg) || 0,
  observacoes: observacoes || '',
};

    try {
      await api.post('/registro', registroPayload);
      Alert.alert('Sucesso', 'Registro salvo com sucesso!');

      setDataObj(null);
      setColetas('');
      setTotalOvos('');
      setEliminadas('');
      setMortas('');
      setTotalAves('');
      setRacaoKg('');
      setObservacoes('');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar o registro.');
    }
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <Text style={styles.title}>📋 Novo Registro Diário</Text>

      <Text style={styles.label}>Data</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ color: dataObj ? '#000' : '#888' }}>
          {dataObj ? dataObj.toLocaleDateString() : 'Selecione a data'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dataObj || new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
          maximumDate={new Date()}
        />
      )}
      <Text style={styles.label}>Coletas (separadas por vírgula)</Text>
      <TextInput
        style={styles.input}
        value={coletas}
        onChangeText={setColetas}
        placeholder="Ex: 30, 42"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Total de Ovos</Text>
      <TextInput
        style={styles.input}
        value={totalOvos}
        onChangeText={setTotalOvos}
        keyboardType="numeric"
        placeholder="0"
      />

      <Text style={styles.label}>Eliminadas</Text>
      <TextInput
        style={styles.input}
        value={eliminadas}
        onChangeText={setEliminadas}
        keyboardType="numeric"
        placeholder="0"
      />

      <Text style={styles.label}>Mortes</Text>
      <TextInput
        style={styles.input}
        value={mortas}
        onChangeText={setMortas}
        keyboardType="numeric"
        placeholder="0"
      />

      <Text style={styles.label}>Ração (Kg)</Text>
      <TextInput
        style={styles.input}
        value={racaoKg}
        onChangeText={setRacaoKg}
        keyboardType="numeric"
        placeholder="0"
      />

      <Text style={styles.label}>Observações</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={observacoes}
        onChangeText={setObservacoes}
        multiline
        placeholder="Digite observações..."
      />

      <Button title="Salvar Registro" onPress={handleSalvar} color="#388E3C" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFDE7',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
});
