import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  mes: number;
  ano: number;
  onChangeMes: (mes: number) => void;
  onChangeAno: (ano: number) => void;
}

export default function MesAnoPicker({ mes, ano, onChangeMes, onChangeAno }: Props) {
  const [show, setShow] = useState(false);

  const onChange = (_event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShow(false);
    if (selectedDate) {
      onChangeMes(selectedDate.getMonth());
      onChangeAno(selectedDate.getFullYear());
    }
  };


  return (
    <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
      <Text style={{ fontWeight: '600', marginBottom: 8 }}>🗓 Filtrar por mês</Text>

      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
          padding: 12,
          backgroundColor: '#FFF8DC',
          borderRadius: 8,
          borderColor: '#CCC',
          borderWidth: 1,
        }}
      >
        <Text>
          {`${new Date(0, mes).toLocaleString('pt-BR', { month: 'long' })} / ${ano}`}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={new Date(ano, mes, 1)}
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()} // impedir datas futuras
        />
      )}
    </View>
  );
}
