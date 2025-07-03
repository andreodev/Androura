import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';

type FiltroDataProps = {
  mesSelecionado: number;
  anoSelecionado: number;
  onChange: (mes: number, ano: number) => void;
};

export default function FiltroData({ mesSelecionado, anoSelecionado, onChange }: FiltroDataProps) {
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      onChange(selectedDate.getMonth(), selectedDate.getFullYear());
    }
  };

  return (
    <View>
      <Text
        style={styles.input}
        onPress={() => setShowPicker(true)}
        accessibilityRole="button"
        accessibilityLabel="Selecionar mês e ano"
      >
        {`${new Date(0, mesSelecionado + 1).toLocaleString('pt-BR', {
          month: 'long',
        })} / ${anoSelecionado}`}
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
    </View>
  );
}

const styles = StyleSheet.create({
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
